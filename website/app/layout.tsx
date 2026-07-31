import type { Metadata } from "next";
import { HashAnchorRestorer } from "./components/HashAnchorRestorer";
import { withBasePath } from "./lib/paths";
import "./globals.css";

const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://hoplittlebunny.github.io/write-like-me";
const socialImageUrl = `${publicSiteUrl.replace(/\/$/, "")}/og-write-like-me.png`;

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: {
    default: "Write Like Me by HopLittleBunny — Open-source AI writing skill",
    template: "%s | Write Like Me",
  },
  description:
    "Lock what you mean, remove generic AI slop, and learn the writing patterns that make your voice yours.",
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
  },
  openGraph: {
    title: "Write Like Me by HopLittleBunny — Open-source AI writing skill",
    description:
      "Lock your meaning. Remove AI slop. Write more like yourself.",
    type: "website",
    url: publicSiteUrl,
    images: [socialImageUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "Write Like Me by HopLittleBunny — Open-source AI writing skill",
    description:
      "Lock your meaning. Remove AI slop. Write more like yourself.",
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <HashAnchorRestorer />
        {children}
      </body>
    </html>
  );
}
