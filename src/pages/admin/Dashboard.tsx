import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLabour } from "@/context/LabourContext";
import { useItem } from "@/context/ItemContext";
import { Users, Package, AlertTriangle, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { labours } = useLabour();
  const { items } = useItem();

  const lowStockItems = items.filter((item) => item.status === "low-stock" || item.status === "out-of-stock");
  const availableLabours = labours.filter((labour) => labour.available);

  // Mock chart data
  const recentActivity = [
    { id: 1, type: "labour", message: "New labour added: John Smith", time: "2 hours ago" },
    { id: 2, type: "stock", message: "Stock updated: Cement Bags", time: "4 hours ago" },
    { id: 3, type: "alert", message: "Low stock alert: Steel Rebar", time: "5 hours ago" },
    { id: 4, type: "labour", message: "Labour status updated: Maria Garcia", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your stock and labour management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Labours"
          value={labours.length}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Stock Items"
          value={items.length}
          icon={Package}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Low Stock Alerts"
          value={lowStockItems.length}
          icon={AlertTriangle}
        />
        <StatsCard
          title="Available Labours"
          value={availableLabours.length}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    {activity.type === "labour" && <Users className="h-4 w-4 text-primary" />}
                    {activity.type === "stock" && <Package className="h-4 w-4 text-accent" />}
                    {activity.type === "alert" && <AlertTriangle className="h-4 w-4 text-warning" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Items */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.quantity} units</p>
                    </div>
                  </div>
                  <Badge variant={item.status === "out-of-stock" ? "destructive" : "secondary"}>
                    {item.status === "out-of-stock" ? "Out" : "Low"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">$45,230</p>
                <p className="text-sm text-success mt-1">+18% from last month</p>
              </div>
              <div className="rounded-full bg-success/10 p-3">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold mt-2">12</p>
                <p className="text-sm text-muted-foreground mt-1">3 completed this week</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Labour Rate</p>
                <p className="text-2xl font-bold mt-2">$135/day</p>
                <p className="text-sm text-muted-foreground mt-1">Based on all labours</p>
              </div>
              <div className="rounded-full bg-accent/10 p-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
