import type { Metadata } from "next";
import { dinnerSeries } from "@/data/dinners";
import DinnerContent from "./DinnerContent";

// Generate static params for all dinner series pages
export function generateStaticParams() {
  return dinnerSeries.map((event) => ({
    slug: event.slug,
  }));
}

// Generate metadata for each dinner page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = dinnerSeries.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Dinner Series | Blue Dot Investors",
    };
  }

  const title = `${event.blogTitle || event.title} | Blue Dot Investors`;
  const description = `Blue Dot Dinner Series: ${event.blogTitle || event.title} - ${event.date}. Join our community of fintech leaders.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function DinnerSeriesPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DinnerContent slug={slug} />;
}
