import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
const inter = Noto_Sans_JP({ subsets: ["cyrillic"], weight: ["400"] });
import ToasterProvider from "./ToasterProvider";

export const metadata: Metadata = {
  title: "食べゆき",
  description: "店探すのは10秒内",
  openGraph: {
    images: [
      "https://drive.google.com/thumbnail?id=1HFv75WvguDLPwbwdM7PoA74XDLiUM4T6&sz=w640",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <head>
        <link
          rel="icon"
          href="https://api.iconify.design/emojione-v1:clinking-beer-mugs.svg"
          sizes="any"
        />
        <link
          rel="icon"
          href="https://api.iconify.design/emojione-v1:clinking-beer-mugs.svg"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="https://api.iconify.design/emojione-v1:clinking-beer-mugs.svg"
          type="image/<generated>"
          sizes="<generated>"
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6194101006796140"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        {children} <ToasterProvider />
      </body>
    </html>
  );
}
