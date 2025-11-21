import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderBand from "@/components/HeaderBand";
import { useUserInitialization } from "@/hooks/useUserInitialization";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { loading } = useUserInitialization();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="h-screen flex w-full bg-background relative overflow-x-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col relative ml-56 w-[calc(100%-14rem)] overflow-hidden">
          {/* New Header Band */}
          <HeaderBand />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
