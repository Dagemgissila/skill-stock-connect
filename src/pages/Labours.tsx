import { Link } from "react-router-dom";
import { PublicHeader } from "@/components/PublicHeader";
import { useLabour } from "@/context/LabourContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";

export default function Labours() {
  const { labours } = useLabour();

  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      <div className="container py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Browse Skilled Labour</h1>
          <p className="text-muted-foreground text-lg">
            Find the right professional for your project
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {labours.map((labour, index) => (
            <Card
              key={labour.id}
              className="overflow-hidden transition-all hover:shadow-xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={labour.image}
                  alt={labour.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{labour.name}</h3>
                    <p className="text-muted-foreground">{labour.profession}</p>
                  </div>
                  <Badge variant={labour.available ? "default" : "secondary"}>
                    {labour.available ? "Available" : "Busy"}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{labour.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{labour.experience}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {labour.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                  {labour.skills.length > 2 && (
                    <Badge variant="outline">+{labour.skills.length - 2} more</Badge>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-2xl font-bold">
                    ${labour.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{labour.priceUnit}
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link to={`/labours/${labour.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
