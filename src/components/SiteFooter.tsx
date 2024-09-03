import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  return (
    <footer>
      <div className="container pt-16 pb-4 text-center mx-auto">
        <p>
          Built by{" "}
          <Link
            href={siteConfig?.links?.x ?? ""}
            target="_blank"
            className="underline font-bold"
          >
            harumi
          </Link>
          . Hosted on{" "}
          <Link
            href="https://vercel.com/"
            target="_blank"
            className="underline font-bold"
          >
            Vercel
          </Link>
        </p>
      </div>
    </footer>
  );
}