import { create } from "zustand";
import { StockItem } from "@/types";

interface ItemState {
  items: StockItem[];
  addItem: (item: StockItem) => void;
  updateItem: (id: string, item: Partial<StockItem>) => void;
  deleteItem: (id: string) => void;
  getItemById: (id: string) => StockItem | undefined;
}

// Mock data
const mockItems: StockItem[] = [
  {
    id: "1",
    name: "Cement Bags (50kg)",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop",
    price: 12.5,
    quantity: 500,
    description: "High-quality Portland cement for construction projects. Each bag weighs 50kg.",
    supplierName: "BuildMart Supplies",
    category: "Construction Materials",
    status: "in-stock",
  },
  {
    id: "2",
    name: "Steel Rebar (12mm)",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop",
    price: 8.0,
    quantity: 15,
    description: "12mm steel reinforcement bars for concrete structures. Sold per meter.",
    supplierName: "SteelCo Industries",
    category: "Steel Products",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Paint (Interior White 5L)",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
    price: 45.0,
    quantity: 120,
    description: "Premium quality interior white paint with excellent coverage. 5-liter container.",
    supplierName: "ColorPro Paints",
    category: "Paints & Finishes",
    status: "in-stock",
  },
  {
    id: "4",
    name: "Electrical Wire (2.5mm²)",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    price: 1.8,
    quantity: 0,
    description: "Copper electrical wire suitable for domestic installations. Sold per meter.",
    supplierName: "WireTech Solutions",
    category: "Electrical",
    status: "out-of-stock",
  },
  {
    id: "5",
    name: "Ceramic Floor Tiles (60x60cm)",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=400&fit=crop",
    price: 25.0,
    quantity: 250,
    description: "Modern ceramic floor tiles in neutral color. Size: 60x60cm. Sold per piece.",
    supplierName: "TileWorld",
    category: "Tiles & Flooring",
    status: "in-stock",
  },
  {
    id: "6",
    name: "PVC Pipes (110mm)",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop",
    price: 15.5,
    quantity: 8,
    description: "Heavy-duty PVC pipes for plumbing and drainage. Diameter: 110mm, Length: 3m.",
    supplierName: "PlumbPro Supplies",
    category: "Plumbing",
    status: "low-stock",
  },
  {
    id: "7",
    name: "Wooden Planks (Oak)",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
    price: 35.0,
    quantity: 180,
    description: "Premium oak wooden planks for furniture and flooring. Dimensions: 2.4m x 15cm x 2cm.",
    supplierName: "WoodCraft Ltd",
    category: "Wood Products",
    status: "in-stock",
  },
  {
    id: "8",
    name: "Safety Helmets",
    image: "https://images.unsplash.com/photo-1581092918484-8313e1f7e8c3?w=400&h=400&fit=crop",
    price: 12.0,
    quantity: 45,
    description: "Industrial safety helmets meeting international standards. Various colors available.",
    supplierName: "SafetyFirst Equipment",
    category: "Safety Gear",
    status: "in-stock",
  },
];

export const useItemStore = create<ItemState>((set, get) => ({
  items: mockItems,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  getItemById: (id) => get().items.find((item) => item.id === id),
}));
