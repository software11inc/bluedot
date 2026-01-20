import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Blue Dot Investors",
  description: "Join the Blue Dot community - intimate gatherings bringing together founders, investors, and industry leaders shaping the future of fintech.",
  openGraph: {
    title: "Community | Blue Dot Investors",
    description: "Join the Blue Dot community - intimate gatherings bringing together founders, investors, and industry leaders shaping the future of fintech.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
