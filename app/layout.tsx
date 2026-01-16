import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Blue Dot | Venture Fund",
  description: "Investing in founders building the future",
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
