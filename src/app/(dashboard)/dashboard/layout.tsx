import MainNav from "@/src/components/MainNav";
import SiteFooter from "@/src/components/SiteFooter";
import DashboardNav from "@/src/components/DashboardNav";
import { dashboardConfig } from "@/config/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex h-20 items-center justify-between py-6 px-6 mx-auto">
          <MainNav items={dashboardConfig.mainNav} />
        </div>
      </header>
      <div className="container grid flex-1 mx-auto gap-12 md:grid-cols-[200px_1fr] pt-20 px-6">
        <aside className="hidden md:flex w-[200px] flex-col">
          <DashboardNav items={dashboardConfig.sidebarNav}/>
        </aside>
        <main className="flex-1 flex flex-col w-full overflow-hidden">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
