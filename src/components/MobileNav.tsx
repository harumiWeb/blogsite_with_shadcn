import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";

type MobileNavProps = {
  items: MainNavItem[];
  children?: React.ReactNode;
};

export default function MobileNav({ items, children }: MobileNavProps) {
  return (
    <div className="fixed top-16 inset-0 z-50 p-6 md:hidden animate-in slide-in-from-bottom-80">
      <div className="grid gap-6 bg-popover p-4 text-popover-foreground rounded-md shadow-md">
        <Link href="/">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="text-sm flex gap-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}