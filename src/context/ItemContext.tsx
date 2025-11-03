import { createContext, useContext, useState, ReactNode } from "react";
import { StockItem } from "@/types";

interface ItemContextType {
  items: StockItem[];
  addItem: (item: StockItem) => void;
  updateItem: (id: string, item: Partial<StockItem>) => void;
  deleteItem: (id: string) => void;
  getItemById: (id: string) => StockItem | undefined;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isEditSheetOpen: boolean;
  setIsEditSheetOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
  setSelectedItem: (item: StockItem | null) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Mock data
const mockItems: StockItem[] = [
  {
    id: "1",
    name: "Cement Bags (50kg)",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1581092918484-8313e1f7e8c3?w=400&h=400&fit=crop",
    price: 12.0,
    quantity: 45,
    description: "Industrial safety helmets meeting international standards. Various colors available.",
    supplierName: "SafetyFirst Equipment",
    category: "Safety Gear",
    status: "in-stock",
  },
];

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StockItem[]>(mockItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  const addItem = (item: StockItem) => {
    setItems([...items, item]);
  };

  const updateItem = (id: string, updatedItem: Partial<StockItem>) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getItemById = (id: string) => {
    return items.find((item) => item.id === id);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        getItemById,
        isAddModalOpen,
        setIsAddModalOpen,
        isEditSheetOpen,
        setIsEditSheetOpen,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItem() {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItem must be used within an ItemProvider");
  }
  return context;
}
