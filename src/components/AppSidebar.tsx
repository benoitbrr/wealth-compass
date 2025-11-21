import { LayoutDashboard, Briefcase, BarChart3, Receipt, TrendingUp, Settings, Users } from "lucide-react";
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
  { title: "Budget", url: "/budget", icon: Receipt },
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
    <Sidebar className={open ? "w-56" : "w-16"} collapsible="icon">
      <SidebarContent className="border-r border-white/5 bg-gradient-to-b from-[#020710] to-[#050A10] relative overflow-hidden">
        {/* BNP Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
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
        <div className={`p-4 border-b border-white/5 relative ${!open && "px-2"}`}>
          {open ? (
            <div className="scale-90 origin-left">
              <BNPLogo />
            </div>
          ) : (
            <div className="flex justify-center">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5L16 2Z" 
                      fill="url(#bnp-mini)" />
                <defs>
                  <linearGradient id="bnp-mini" x1="2" y1="2" x2="30" y2="30">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" />
                    <stop offset="100%" stopColor="hsl(var(--bnp-dark-green))" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <SidebarGroup className="py-4 relative">
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
                            ? "bg-secondary/10 text-white font-medium" 
                            : "text-[#C8D0D8] hover:bg-white/5 hover:text-white"
                          }
                        `}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-secondary rounded-r-full" />
                        )}
                        
                        <item.icon 
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            active ? "text-white" : "text-[#C8D0D8] group-hover:text-white"
                          }`} 
                          strokeWidth={1.5}
                        />
                        {open && (
                          <span className="flex-1 text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer Info */}
        {open && (
          <div className="mt-auto p-4 border-t border-white/5 relative">
            <div className="text-xs text-[#6B7280] space-y-0.5">
              <p className="font-medium text-[#C8D0D8]">BNP Private Banking</p>
              <p className="text-[10px]">Support 24/7</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
