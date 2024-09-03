import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const noto_sans_jp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog with Next.js",
  description: "Next.jsとshadcnを使用して作成したブログです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn(
          noto_sans_jp.className,
          "bg-background antialiased min-h-screen"
        )}
      >
        {children}
      </body>
    </html>
  );
}
