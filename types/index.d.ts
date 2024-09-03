export type SiteConfig = {
  name: string;
  subName: string;
  description: string;
  url: string;
  ogImage?: string;
  links?: {
    x: string;
    github: string;
  };
};