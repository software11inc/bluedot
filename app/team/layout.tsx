import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | Blue Dot Investors",
  description: "Meet the Blue Dot team - fintech experts with deep sector expertise in late-stage secondaries and special situations investing.",
  openGraph: {
    title: "Team | Blue Dot Investors",
    description: "Meet the Blue Dot team - fintech experts with deep sector expertise in late-stage secondaries and special situations investing.",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
