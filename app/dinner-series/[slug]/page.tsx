import { dinnerSeries } from "@/data/dinners";
import DinnerContent from "./DinnerContent";

// Generate static params for all dinner series pages
export function generateStaticParams() {
  return dinnerSeries.map((event) => ({
    slug: event.slug,
  }));
}

export default async function DinnerSeriesPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DinnerContent slug={slug} />;
}
