"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";
import MobileNav from "./MobileNav";
import { useState } from "react";

type MainNavProps = {
  items: MainNavItem[];
  children?: React.ReactNode;
};

export default function MainNav({ items, children }: MainNavProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center md:gap-10">
      <Link
        href={"/"}
        className="hidden md:flex items-center text-lg space-x-2"
      >
        <span className="font-bold hidden sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="md:flex gap-6 hidden">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-lg sm:text-sm font-medium hover:text-foreground/80"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <button
        className="md:hidden flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>メニュー</span>
      </button>
      {isOpen && <MobileNav items={items} />}
    </div>
  );
}
