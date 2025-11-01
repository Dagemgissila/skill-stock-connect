import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function PublicHeader() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/labours", label: "Labours", startsWith: "/labours/" },
    { to: "/items", label: "Stock Items", startsWith: "/items/" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 lg:h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-gradient-primary p-1.5 lg:p-2">
            <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
          </div>
          <span className="font-bold text-lg lg:text-xl">StockLabour</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.to) || (link.startsWith && location.pathname.startsWith(link.startsWith))
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link to="/admin/dashboard">Admin Panel</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md",
                      isActive(link.to) || (link.startsWith && location.pathname.startsWith(link.startsWith))
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="w-full mt-4" onClick={() => setIsOpen(false)}>
                  <Link to="/admin/dashboard">Admin Panel</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
