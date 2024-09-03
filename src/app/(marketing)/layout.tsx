import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import MainNav from "@/src/components/MainNav";
import SiteFooter from "@/src/components/SiteFooter";
import { marketingConfig } from "@/config/marketing";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="container z-40 bg-background/80 backdrop-blur-sm mx-auto px-6 fixed top-0 left-0 right-0">
        <div className="h-20 py-6 flex justify-between items-center">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
