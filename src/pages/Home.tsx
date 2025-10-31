import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/components/PublicHeader";
import { Badge } from "@/components/ui/badge";
import { Users, Package, Star, TrendingUp, Mail, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 animate-fade-in">
          {/* Hero Text */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Find Quality{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Labour & Stock
                </span>
                <br />
                All in One Place
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Connect with skilled professionals and browse quality construction materials. 
                Your complete solution for project management.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/labours">Browse Labours</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/items">View Stock Items</Link>
              </Button>
            </div>
          </div>

          {/* Featured Professional Card */}
          <div className="flex-1 max-w-md w-full animate-scale-in">
            <div className="bg-card border rounded-2xl p-6 shadow-elegant hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                    alt="Michael Rodriguez"
                    className="h-32 w-32 rounded-full object-cover border-4 border-primary/10"
                  />
                  <Badge className="absolute bottom-0 right-0 bg-success text-success-foreground">
                    Available
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Michael Rodriguez</h3>
                  <p className="text-primary font-semibold">Civil Engineer</p>
                  <div className="flex items-center justify-center gap-1 text-warning">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-foreground font-medium">4.9</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Senior civil engineer with extensive experience in large-scale infrastructure projects. 
                  Expert in structural design, project planning, and construction management.
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Structural Design</Badge>
                  <Badge variant="secondary">Project Management</Badge>
                  <Badge variant="secondary">AutoCAD</Badge>
                  <Badge variant="secondary">Site Supervision</Badge>
                </div>

                <div className="w-full pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-semibold">14 years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-semibold text-primary">$200/day</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>

                <Button asChild className="w-full">
                  <Link to="/labours/7">View Full Profile</Link>
                </Button>
              </div>
            </div>
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
