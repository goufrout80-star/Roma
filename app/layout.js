import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://roma-fruits-secs.vercel.app"),
  title: "Roma Fruits Secs — Wholesale Dried Fruits & Nuts",
  description: "Wholesale dried fruits and nuts for retailers, cafés, bakeries, hospitality and professional buyers.",
  openGraph: {
    title: "Roma Fruits Secs — From Origin to Business",
    description: "Wholesale dried fruits and nuts for professional buyers.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_MA"],
    siteName: "Roma Fruits Secs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roma Fruits Secs — From Origin to Business",
    description: "Wholesale dried fruits and nuts for professional buyers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
