import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Blue Dot Investors",
  description: "Get in touch with Blue Dot Investors. Whether you're a founder, investor, or looking to connect - we'd love to hear from you.",
  openGraph: {
    title: "Contact | Blue Dot Investors",
    description: "Get in touch with Blue Dot Investors. Whether you're a founder, investor, or looking to connect - we'd love to hear from you.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
