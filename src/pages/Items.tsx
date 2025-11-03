import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicHeader } from "@/components/PublicHeader";
import { useItem } from "@/context/ItemContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function Items() {
  const { items } = useItem();
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, 8);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "in-stock":
        return "default";
      case "low-stock":
        return "secondary";
      case "out-of-stock":
        return "destructive";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      <div className="container py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Stock Items</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Browse our inventory of quality construction materials
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all hover:shadow-xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold line-clamp-2">{item.name}</h3>
                  <Badge variant={getStatusVariant(item.status)}>
                    {getStatusLabel(item.status)}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{item.category}</p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold">${item.price}</p>
                    <p className="text-sm text-muted-foreground">per unit</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.quantity} available</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" variant="outline">
                  <Link to={`/items/${item.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {items.length > 8 && (
          <div className="mt-12 text-center">
            <Button 
              onClick={() => setShowAll(!showAll)} 
              size="lg"
              variant="outline"
            >
              {showAll ? "Show Less" : `View More (${items.length - 8} more)`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
