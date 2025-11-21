import { LayoutDashboard, Wallet, PieChart, Receipt, TrendingUp, Settings, Users, ChevronRight } from "lucide-react";
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
  { title: "Patrimoine", url: "/wealth", icon: Wallet },
  { title: "Analyse", url: "/analysis", icon: PieChart },
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
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <SidebarContent className="border-r bg-card/50 backdrop-blur-xl">
        {/* Logo */}
        <div className={`p-4 border-b ${!open && "px-2"}`}>
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
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`
                          flex items-center gap-3 px-3 rounded-lg transition-all group
                          hover:bg-secondary/10 hover:text-secondary
                          ${active 
                            ? "bg-secondary/15 text-secondary font-semibold border-l-4 border-secondary pl-2.5" 
                            : "text-muted-foreground border-l-4 border-transparent"
                          }
                        `}
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-secondary" : ""}`} />
                        {open && (
                          <span className="flex-1 text-sm">{item.title}</span>
                        )}
                        {open && active && (
                          <ChevronRight className="w-4 h-4 text-secondary" />
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
          <div className="mt-auto p-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">BNP Private Banking</p>
              <p>Support 24/7</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
