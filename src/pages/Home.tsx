import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicHeader } from "@/components/PublicHeader";
import { useLabour } from "@/context/LabourContext";
import { useItem } from "@/context/ItemContext";
import { useNavigate } from "react-router-dom";
import { Star, Phone, ArrowRight } from "lucide-react";

const Home = () => {
  const { labours } = useLabour();
  const { items } = useItem();
  const navigate = useNavigate();

  const sampleLabours = labours.slice(0, 3);
  const sampleItems = items.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Skilled Labour & Quality Materials</h1>
          <p className="text-xl text-muted-foreground mb-8">Connect with experienced professionals and browse construction materials</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/labours")}>Browse Labour</Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/items")}>View Materials</Button>
          </div>
        </div>
      </section>

      {/* Labour Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Labour</h2>
            <p className="text-muted-foreground">Skilled professionals ready to work</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/labours")}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLabours.map((labour) => (
            <Card key={labour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted relative">
                  {labour.imageUrl && (
                    <img src={labour.imageUrl} alt={labour.name} className="w-full h-full object-cover" />
                  )}
                  {labour.available ? (
                    <Badge className="absolute top-2 right-2">Available</Badge>
                  ) : (
                    <Badge variant="secondary" className="absolute top-2 right-2">Unavailable</Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{labour.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{labour.profession}</p>
                  {labour.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{labour.rating}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{labour.phone}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="outline" onClick={() => navigate(`/labours/${labour.id}`)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Items Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Construction Materials</h2>
              <p className="text-muted-foreground">Quality materials for your projects</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("/items")}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-background relative">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    )}
                    <Badge 
                      className="absolute top-2 right-2"
                      variant={item.status === "in-stock" ? "default" : item.status === "low-stock" ? "secondary" : "destructive"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">${item.price}</span>
                      <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" variant="outline" onClick={() => navigate(`/items/${item.id}`)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
