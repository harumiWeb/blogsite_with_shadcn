export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

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

export type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};