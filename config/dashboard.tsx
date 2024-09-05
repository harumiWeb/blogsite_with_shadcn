import { DashboardConfig } from "@/types";
import { PostIcon } from "@/src/components/icons/PostIcon";
import { WalletIcon } from "@/src/components/icons/WalletIcon";
import { ConfigIcon } from "@/src/components/icons/ConfigIcon";

const size = "2em";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "ドキュメント",
      href: "/docs",
    },
    {
      title: "サポート",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "記事投稿",
      href: "/dashboard",
      icon: <PostIcon size={size} />,
    },
    {
      title: "お支払い",
      href: "/dashboard/payments",
      icon: <WalletIcon size={size} />,
    },
    {
      title: "設定",
      href: "/dashboard/settings",
      icon: <ConfigIcon size={size} />,
    },
  ],
};