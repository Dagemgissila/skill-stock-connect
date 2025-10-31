import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LabourProvider } from "@/context/LabourContext";
import { ItemProvider } from "@/context/ItemContext";
import { UserProvider } from "@/context/UserContext";
import Home from "./pages/Home";
import Labours from "./pages/Labours";
import LabourDetail from "./pages/LabourDetail";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminLabours from "./pages/admin/AdminLabours";
import AdminItems from "./pages/admin/AdminItems";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LabourProvider>
        <ItemProvider>
          <UserProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/labours" element={<Labours />} />
                <Route path="/labours/:id" element={<LabourDetail />} />
                <Route path="/items" element={<Items />} />
                <Route path="/items/:id" element={<ItemDetail />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="labours" element={<AdminLabours />} />
                  <Route path="items" element={<AdminItems />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ItemProvider>
      </LabourProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
