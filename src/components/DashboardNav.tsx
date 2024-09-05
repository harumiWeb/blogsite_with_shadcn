"use client";

import { SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export default function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <span
            className={`flex items-center rounded-md px-3 py-2 text-sm md:text-base lg:text-lg font-medium hover:bg-accent hover:text-accent-foreground gap-2 ${
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {item.icon}
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}
