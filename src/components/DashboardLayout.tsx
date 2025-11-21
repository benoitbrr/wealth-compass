import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderBand from "@/components/HeaderBand";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background relative overflow-x-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col relative ml-56 w-[calc(100%-14rem)]">
          {/* New Header Band */}
          <HeaderBand />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden pt-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
