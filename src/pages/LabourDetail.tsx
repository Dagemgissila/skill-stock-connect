import { useParams, Link } from "react-router-dom";
import { PublicHeader } from "@/components/PublicHeader";
import { useLabour } from "@/context/LabourContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Mail, Phone, ArrowLeft, Clock, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function LabourDetail() {
  const { id } = useParams();
  const { getLabourById } = useLabour();
  const labour = getLabourById(id || "");

  if (!labour) {
    return (
      <div className="min-h-screen">
        <PublicHeader />
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Labour Not Found</h1>
          <Button asChild>
            <Link to="/labours">Back to Labours</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    toast.success("Contact request sent! The labour will get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      <PublicHeader />
      
      <div className="container py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/labours">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Labours
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                  <img
                    src={labour.image}
                    alt={labour.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{labour.name}</h1>
                      <p className="text-xl text-muted-foreground">{labour.profession}</p>
                    </div>
                    <Badge variant={labour.available ? "default" : "secondary"} className="text-sm">
                      {labour.available ? "Available" : "Busy"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-warning text-warning" />
                      <span className="text-lg font-semibold">{labour.rating}</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      <span>{labour.experience} experience</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {labour.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {labour.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="text-2xl font-bold">
                        ${labour.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{labour.priceUnit}
                        </span>
                      </p>
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
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{labour.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{labour.phone}</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg" onClick={handleContact}>
                  Contact {labour.name.split(" ")[0]}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{labour.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">{labour.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">${labour.price}/{labour.priceUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={labour.available ? "default" : "secondary"}>
                      {labour.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
