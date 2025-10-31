import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Package, Settings, Briefcase } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Labour Management",
    icon: Users,
    href: "/admin/labours",
  },
  {
    label: "Stock Management",
    icon: Package,
    href: "/admin/items",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <div className="rounded-lg bg-gradient-primary p-2">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === route.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
        >
          <span>← Back to Public Site</span>
        </Link>
      </div>
    </div>
  );
}
