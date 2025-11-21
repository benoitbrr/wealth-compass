import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import BNPPattern from "@/components/BNPPattern";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background bnp-pattern relative">
        <BNPPattern />
        <AppSidebar />
        
        <div className="flex-1 flex flex-col relative">
          {/* Top Header */}
          <header className="h-14 border-b bg-card/80 backdrop-blur-xl sticky top-0 z-40 shadow-card">
            <div className="h-full px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-2" />
                <Badge variant="secondary" className="hidden md:flex items-center gap-1 text-xs">
                  <Sparkles className="w-3 h-3" />
                  IA Active
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
