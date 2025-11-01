import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  Briefcase,
  Home,
  X,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Labour Management",
    icon: Users,
    href: "/admin/labours",
  },
  {
    title: "Stock Management",
    icon: Package,
    href: "/admin/items",
  },
  {
    title: "Users",
    icon: UserCog,
    href: "/admin/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 border-r bg-sidebar-background text-sidebar-foreground flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 lg:p-6 border-b border-sidebar-border flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center space-x-2" onClick={onClose}>
            <div className="rounded-lg bg-sidebar-primary p-2">
              <Briefcase className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-lg lg:text-xl">Admin Panel</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/" onClick={onClose} className="flex items-center space-x-3">
              <Home className="h-5 w-5" />
              <span>Back to Public Site</span>
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
