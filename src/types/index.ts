// Core types for the application

export interface Labour {
  id: string;
  name: string;
  image: string;
  profession: string;
  price: number;
  priceUnit: "day" | "hour";
  rating: number;
  experience: string;
  skills: string[];
  description: string;
  phone: string;
  email: string;
  available: boolean;
}

export interface StockItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
  supplierName?: string;
  category: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export interface DashboardStats {
  totalLabours: number;
  totalItems: number;
  lowStockCount: number;
  totalRevenue: number;
}
