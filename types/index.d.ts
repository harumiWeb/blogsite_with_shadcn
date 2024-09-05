export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SidebarNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: SidebarNavItem[];
    }
);

export type SiteConfig = {
  name: string;
  subName: string;
  description: string;
  url: string;
  links?: {
    x: string;
    github: string;
  };
  keywords: string[];
  authors: { name: string }[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};