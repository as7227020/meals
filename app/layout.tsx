import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";

const inter = Noto_Sans_JP({ subsets: ["cyrillic"], weight: ["400"] });

export const metadata: Metadata = {
  title: "食べゆき",
  description: "店探すのは10秒内",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
