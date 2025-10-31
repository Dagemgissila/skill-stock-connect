import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/components/PublicHeader";
import { Users, Package, Star, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Quality{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Labour & Stock
              </span>
              <br />
              All in One Place
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with skilled professionals and browse quality construction materials. 
              Your complete solution for project management.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/labours">Browse Labours</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link to="/items">View Stock Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 bg-muted/30">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 animate-slide-up">
            <div className="rounded-full bg-primary/10 p-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Verified Labours</h3>
            <p className="text-muted-foreground">
              Access to skilled and verified professionals
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-full bg-accent/10 p-4">
              <Package className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Quality Stock</h3>
            <p className="text-muted-foreground">
              Wide range of construction materials
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-full bg-success/10 p-4">
              <Star className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Top Rated</h3>
            <p className="text-muted-foreground">
              Highly rated professionals and products
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-full bg-warning/10 p-4">
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
            <h3 className="text-xl font-semibold">Easy Management</h3>
            <p className="text-muted-foreground">
              Streamlined inventory and labour tracking
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied customers managing their projects efficiently
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/admin/dashboard">Access Admin Panel</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
