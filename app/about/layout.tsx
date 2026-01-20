import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Blue Dot Investors",
  description: "Blue Dot is a fintech specialist investment firm focused on late-stage secondaries and special situations investing across all major fintech verticals.",
  openGraph: {
    title: "About | Blue Dot Investors",
    description: "Blue Dot is a fintech specialist investment firm focused on late-stage secondaries and special situations investing across all major fintech verticals.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
