// Core types for the application

export interface Labour {
  id: string;
  name: string;
  imageUrl?: string;
  profession: string;
  price: number;
  priceUnit: "day" | "hour" | "project";
  rating?: number;
  experience: number;
  skills: string[];
  description: string;
  phone: string;
  email?: string;
  available: boolean;
}

export interface StockItem {
  id: string;
  name: string;
  imageUrl?: string;
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
