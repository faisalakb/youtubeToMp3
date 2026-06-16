import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HowToGuide from "@/components/HowToGuide";
import { site } from "@/lib/site";
import { DEVICES, getDevice } from "@/lib/devices";

type Params = { device: string };

export function generateStaticParams(): Params[] {
  return DEVICES.map((d) => ({ device: d.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const d = getDevice(params.device);
  if (!d) return {};
  const path = `/guides/${d.slug}`;
  return {
    title: d.title,
    description: d.description,
    alternates: { canonical: path },
    openGraph: { title: d.title, description: d.description, url: site.url + path, type: "article" },
  };
}

export default function DeviceGuide({ params }: { params: Params }) {
  const d = getDevice(params.device);
  if (!d) notFound();
  return (
    <HowToGuide
      title={d.title}
      description={d.description}
      intro={d.intro}
      os={d.os}
      steps={d.steps}
      faqs={d.faqs}
      path={`/guides/${d.slug}`}
    />
  );
}
