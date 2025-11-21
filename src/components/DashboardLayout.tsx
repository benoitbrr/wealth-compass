import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import BNPPattern from "@/components/BNPPattern";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background bnp-pattern relative overflow-x-hidden">
        <BNPPattern />
        <AppSidebar />
        
        <div className="flex-1 flex flex-col relative ml-56 w-[calc(100%-14rem)]">
          {/* Top Header */}
          <header className="h-14 border-b bg-card/80 backdrop-blur-xl sticky top-0 z-40 shadow-card flex-shrink-0">
            <div className="h-full px-6 flex items-center justify-end gap-2">
              <ThemeToggle />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative rounded-full hover:bg-white/5"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary/20 text-secondary font-medium text-sm">
                        JP
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-48 p-2 bg-card/95 backdrop-blur-xl border-white/10" 
                  align="end"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-sm hover:bg-white/5"
                      onClick={() => navigate("/profile-summary")}
                    >
                      <User className="w-4 h-4" />
                      Mon profil
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-sm hover:bg-white/5"
                    >
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </Button>
                    <div className="h-px bg-white/10 my-1" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-sm hover:bg-white/5 text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>

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
