import "./globals.css";

export const metadata = {
  title: "Roma Fruits Secs — Wholesale Dried Fruits & Nuts",
  description: "Wholesale dried fruits and nuts for retailers, cafés, bakeries and professional buyers.",
  metadataBase: new URL("https://roma-fruits.vercel.app"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
