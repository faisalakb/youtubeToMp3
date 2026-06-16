-- mp3bat Phase 3 schema: accounts, subscriptions, soft usage cap.
-- Run with `supabase db push`, or paste into the Supabase SQL editor.
-- Security model follows the Supabase checklist: RLS on every table, ownership
-- predicates with TO authenticated, authz state in the DB (never user_metadata).

-- ============================================================================
-- profiles: one row per auth user. is_pro is the authorization source of truth,
-- written only by the server (service role) from the Stripe webhook.
-- ============================================================================
create table if not exists public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  is_pro             boolean not null default false,
  stripe_customer_id text unique,
  updated_at         timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Owners may read their own profile. No client write policy: is_pro and the
-- Stripe customer id are managed server-side via the service role only.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

-- ============================================================================
-- subscriptions: mirror of Stripe state, written only by the webhook.
-- ============================================================================
create table if not exists public.subscriptions (
  id                   text primary key,            -- Stripe subscription id
  user_id              uuid not null references auth.users (id) on delete cascade,
  status               text not null,               -- active, canceled, past_due, ...
  price_id             text,
  current_period_end   timestamptz,
  updated_at           timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- ============================================================================
-- usage_daily: soft per-account daily conversion counter.
-- ============================================================================
create table if not exists public.usage_daily (
  user_id  uuid not null references auth.users (id) on delete cascade,
  day      date not null default current_date,
  count    integer not null default 0,
  primary key (user_id, day)
);

alter table public.usage_daily enable row level security;

-- Owner can read and maintain their own counter. The record_conversion() RPC
-- upserts, which needs both INSERT and UPDATE to pass under SECURITY INVOKER.
drop policy if exists "usage_select_own" on public.usage_daily;
create policy "usage_select_own" on public.usage_daily
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "usage_insert_own" on public.usage_daily;
create policy "usage_insert_own" on public.usage_daily
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "usage_update_own" on public.usage_daily;
create policy "usage_update_own" on public.usage_daily
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ============================================================================
-- record_conversion(): atomically bump today's counter for the caller and
-- return the new total. SECURITY INVOKER so RLS applies (a user can only ever
-- touch their own row).
-- ============================================================================
create or replace function public.record_conversion()
  returns integer
  language plpgsql
  security invoker
  set search_path = ''
as $$
declare
  new_count integer;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  insert into public.usage_daily (user_id, day, count)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, day)
  do update set count = public.usage_daily.count + 1
  returning count into new_count;

  return new_count;
end;
$$;

revoke all on function public.record_conversion() from public;
grant execute on function public.record_conversion() to authenticated;

-- ============================================================================
-- New-user trigger: create a profile row when an auth user is created.
-- SECURITY DEFINER is required to insert into public.profiles from the auth
-- schema context; the function only ever inserts the new user's own row.
-- ============================================================================
create or replace function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer
  set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
