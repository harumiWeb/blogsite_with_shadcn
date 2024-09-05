import MainNav from "@/src/components/MainNav";
import SiteFooter from "@/src/components/SiteFooter";
import DashboardNav from "@/src/components/DashboardNav";
import { dashboardConfig } from "@/config/dashboard";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto grid items-center gap-10 py-8">
      {children}
    </div>
  );
}
