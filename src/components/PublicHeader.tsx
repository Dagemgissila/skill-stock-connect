import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-gradient-primary p-2">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">StockLabour</span>
        </Link>
        
        <nav className="flex items-center space-x-6 ml-auto">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/labours"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/labours") || location.pathname.startsWith("/labours/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Labours
          </Link>
          <Link
            to="/items"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/items") || location.pathname.startsWith("/items/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Stock Items
          </Link>
          <Button asChild>
            <Link to="/admin/dashboard">Admin Panel</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
