import { LayoutDashboard, Briefcase, BarChart3, TrendingUp, Settings, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import BNPLogo from "@/components/BNPLogo";

const menuItems = [
  { title: "Synthèse", url: "/dashboard", icon: LayoutDashboard },
  { title: "Patrimoine", url: "/wealth", icon: Briefcase },
  { title: "Analyse", url: "/analysis", icon: BarChart3 },
  { title: "Investir", url: "/invest", icon: TrendingUp },
  { title: "Outils", url: "/tools", icon: Settings },
  { title: "Communauté", url: "/community", icon: Users },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="w-56 transition-colors duration-200 fixed left-0 top-0 h-screen" collapsible="none">
      <SidebarContent className="border-r border-border bg-card relative overflow-hidden h-full flex flex-col">
        {/* BNP Pattern Overlay - only visible in dark mode */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:block hidden">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            <defs>
              <pattern id="bnp-sidebar-stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 10L45 30L65 40L45 50L40 70L35 50L15 40L35 30Z" 
                      fill="currentColor" 
                      className="text-secondary" 
                      opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="400" height="800" fill="url(#bnp-sidebar-stars)"/>
          </svg>
        </div>

        {/* Logo */}
        <div className="p-4 border-b border-border relative">
          <div className="scale-90 origin-left">
            <BNPLogo />
          </div>
        </div>

        {/* Menu Items */}
        <SidebarGroup className="py-4 relative flex-1 overflow-y-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-3">
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12">
                      <NavLink
                        to={item.url}
                        className={`
                          flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative
                          ${active 
                            ? "bg-secondary/[0.08] dark:bg-secondary/10 text-[#1A1F24] dark:text-white font-medium" 
                            : "text-[#1A1F24] dark:text-[#C7D1D9] hover:bg-[#F3F5F7] dark:hover:bg-[#0D1520]"
                          }
                        `}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-secondary rounded-r-full" />
                        )}
                        
                        <item.icon 
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            active 
                              ? "text-[#1A1F24] dark:text-white" 
                              : "text-[#1A1F24] dark:text-[#C7D1D9] group-hover:text-[#000] dark:group-hover:text-white"
                          }`} 
                          strokeWidth={1.5}
                        />
                        <span className="flex-1 text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer Info */}
        <div className="mt-auto p-4 border-t border-border relative">
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p className="font-medium text-[#1A1F24] dark:text-[#C7D1D9]">BNP Private Banking</p>
            <p className="text-[10px]">Support 24/7</p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
