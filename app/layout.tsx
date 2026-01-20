import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const lyonDisplay = localFont({
  src: "./fonts/LyonDisplay-Medium.otf",
  variable: "--font-lyon",
  display: "swap",
});

const newGrotesk = localFont({
  src: [
    {
      path: "./fonts/New-Grotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/New-Grotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/New-Grotesk-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-grotesk",
  display: "swap",
});

const cartograph = localFont({
  src: "./fonts/CartographMonoCF-Medium.otf",
  variable: "--font-cartograph",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Blue Dot Investors | Fintech Secondaries and Late Stage Investing",
  description: "A fintech specialist investment firm focused on late-stage secondaries and special situations investing.",
  metadataBase: new URL("https://bluedotinvestors.com"),
  openGraph: {
    title: "Blue Dot Investors | Fintech Secondaries and Late Stage Investing",
    description: "A fintech specialist investment firm focused on late-stage secondaries and special situations investing.",
    url: "https://bluedotinvestors.com",
    siteName: "Blue Dot Investors",
    images: [
      {
        url: "https://bluedotinvestors.com/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "Blue Dot Investors",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Dot Investors | Fintech Secondaries and Late Stage Investing",
    description: "A fintech specialist investment firm focused on late-stage secondaries and special situations investing.",
    images: ["https://bluedotinvestors.com/og-image.png?v=3"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lyonDisplay.variable} ${newGrotesk.variable} ${cartograph.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
