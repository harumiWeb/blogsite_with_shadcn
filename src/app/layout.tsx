import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { cn } from "@/src/lib/utils";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/src/components/ui/toaster";

const noto_sans_jp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} with shadcn`,
  },
  description: `${siteConfig.description}`,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
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
        <Toaster />
      </body>
    </html>
  );
}
