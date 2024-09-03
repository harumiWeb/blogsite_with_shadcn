import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { siteConfig } from "@/config/site";
import { features } from "@/config/features";

export default function IndexPage() {
  return (
    <>
      <section className="pt-20 md:pt-24 lg:pt-32 pb-8 md:pb-12 px-6">
        <div className="container text-center flex flex-col items-center gap-4 max-w-[64rem] mx-auto">
          <Link
            href={siteConfig.links?.x ?? ""}
            className="bg-muted px-4 py-1.5 rounded-2xl font-medium text-sm"
            target="_blank"
            rel="noreferrer"
          >
            Xをフォローする
          </Link>
          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.name}
            <span className="text-xs font-normal md:text-sm lg:text-xl pl-2">
              {siteConfig.subName}
            </span>
          </h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">
            {siteConfig.description}
          </p>

          <div className="space-x-4">
            <Link
              href={"/login"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              はじめる
            </Link>
            <Link
              href={siteConfig.links?.github ?? ""}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container py-8 md:py-12 lg:py-24 bg-slate-50 w-full mx-auto px-6 max-w-[58rem] space-y-6"
      >
        <div className="text-center space-y-6">
          <h2 className="font-extrabold text-3xl md:text-6xl">
            サービスの特徴
          </h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            このプロジェクトはモダンな技術スタックを使用して作られたWebアプリケーションです。
            <br />
            Next.js App
            RouterやContentlayerを利用してマークダウン形式でブログ投稿ができます。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
          {features.map((feature) => (
            <div className="bg-background border p-2 rounded-lg" key={feature.title}>
              <div className="flex flex-col justify-between p-6 min-h-[180px]">
                {feature.icon}
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground sm:text-lg sm:leading-7 text-center">
          <p>
            {siteConfig.name}はログインするとブログ投稿ができるようになります。
          </p>
        </div>
      </section>

      <section id="contact" className="container py-12 sm:py-16 md:py-24 lg:py-32 w-full mx-auto px-6 max-w-[58rem] space-y-6 md:space-y-12">
        <div className="max-w-[58rem] mx-auto text-center space-y-6">
          <h2 className="font-extrabold text-3xl md:text-6xl">Contact Me</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            もしもあなたがこのアプリケーションについての質問や提案があれば、お気軽にお問い合わせください。
            <br />
            お仕事のご連絡もお待ちしております。
          </p>
          <Link
            href={siteConfig.links?.x ?? ""}
            className={cn(buttonVariants({ size: "lg" }))}
            target="_blank"
            rel="noreferrer"
          >
            Xをフォローする
          </Link>
        </div>
      </section>
    </>
  );
}
