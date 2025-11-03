import { useParams, Link } from "react-router-dom";
import { PublicHeader } from "@/components/PublicHeader";
import { useItem } from "@/context/ItemContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ArrowLeft, Building2, Tag } from "lucide-react";
import { toast } from "sonner";

export default function ItemDetail() {
  const { id } = useParams();
  const { getItemById } = useItem();
  const item = getItemById(id || "");

  if (!item) {
    return (
      <div className="min-h-screen">
        <PublicHeader />
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <Button asChild>
            <Link to="/items">Back to Items</Link>
          </Button>
        </div>
      </div>
    );
  }

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

  const handleRequest = () => {
    toast.success("Request submitted! Our team will contact you shortly.");
  };

  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      <div className="container py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/items">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Items
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                      <p className="text-lg text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge variant={getStatusVariant(item.status)} className="text-sm">
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Tag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price per unit</p>
                        <p className="text-2xl font-bold">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-accent/10 p-3">
                        <Package className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Available quantity</p>
                        <p className="text-2xl font-bold">{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-slide-up">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">${item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{item.quantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={getStatusVariant(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {item.supplierName && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Supplier</h3>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{item.supplierName}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trusted supplier with quality products
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Need this item?</h3>
                <p className="text-muted-foreground mb-4">
                  Contact us to place an order or request a quote for bulk purchases.
                </p>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleRequest}
                  disabled={item.status === "out-of-stock"}
                >
                  {item.status === "out-of-stock" ? "Out of Stock" : "Request Item"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
