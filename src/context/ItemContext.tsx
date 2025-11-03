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
  {
    id: "9",
    name: "Concrete Blocks",
    image: "https://images.unsplash.com/photo-1590642916589-592bca10dfbf?w=400&h=400&fit=crop",
    price: 2.5,
    quantity: 1000,
    description: "Standard concrete blocks for construction. Size: 400x200x200mm.",
    supplierName: "BlockMaster Co",
    category: "Construction Materials",
    status: "in-stock",
  },
  {
    id: "10",
    name: "Sand (Per Ton)",
    image: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=400&h=400&fit=crop",
    price: 45.0,
    quantity: 50,
    description: "Fine construction sand suitable for masonry and concrete work. Sold per ton.",
    supplierName: "SandPro Supplies",
    category: "Construction Materials",
    status: "in-stock",
  },
  {
    id: "11",
    name: "Gravel (Per Ton)",
    image: "https://images.unsplash.com/photo-1590856029620-0057a4cce5c5?w=400&h=400&fit=crop",
    price: 40.0,
    quantity: 35,
    description: "Crushed gravel for concrete mixing and landscaping. Sold per ton.",
    supplierName: "StoneCraft Ltd",
    category: "Construction Materials",
    status: "in-stock",
  },
  {
    id: "12",
    name: "Roofing Sheets (Galvanized)",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
    price: 28.0,
    quantity: 12,
    description: "Galvanized corrugated roofing sheets. Length: 3m, Width: 1m.",
    supplierName: "RoofMaster Inc",
    category: "Roofing Materials",
    status: "low-stock",
  },
  {
    id: "13",
    name: "Door Frames (Wooden)",
    image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=400&h=400&fit=crop",
    price: 65.0,
    quantity: 28,
    description: "Pre-made wooden door frames. Standard size: 2.1m x 0.9m.",
    supplierName: "DoorCraft Industries",
    category: "Doors & Windows",
    status: "in-stock",
  },
  {
    id: "14",
    name: "Window Glass (Clear)",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=400&fit=crop",
    price: 35.0,
    quantity: 60,
    description: "Clear float glass for windows. Thickness: 5mm. Sold per square meter.",
    supplierName: "GlassTech Solutions",
    category: "Doors & Windows",
    status: "in-stock",
  },
  {
    id: "15",
    name: "Insulation Foam",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
    price: 22.0,
    quantity: 95,
    description: "Spray foam insulation for walls and roofs. High thermal resistance.",
    supplierName: "InsulPro Ltd",
    category: "Insulation",
    status: "in-stock",
  },
  {
    id: "16",
    name: "LED Bulbs (10W)",
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&h=400&fit=crop",
    price: 8.5,
    quantity: 200,
    description: "Energy-efficient LED bulbs. 10W equivalent to 60W traditional bulbs.",
    supplierName: "LightTech Co",
    category: "Electrical",
    status: "in-stock",
  },
  {
    id: "17",
    name: "Circuit Breakers (20A)",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
    price: 15.0,
    quantity: 5,
    description: "Miniature circuit breakers for residential installations. Rating: 20A.",
    supplierName: "ElectroPro Solutions",
    category: "Electrical",
    status: "low-stock",
  },
  {
    id: "18",
    name: "Waterproofing Membrane",
    image: "https://images.unsplash.com/photo-1590642916613-f1c0e8b6e4c2?w=400&h=400&fit=crop",
    price: 55.0,
    quantity: 42,
    description: "Self-adhesive waterproofing membrane for foundations and basements. Roll: 10m x 1m.",
    supplierName: "WaterShield Inc",
    category: "Waterproofing",
    status: "in-stock",
  },
  {
    id: "19",
    name: "Mixing Tools Set",
    image: "https://images.unsplash.com/photo-1581092160607-ee67166a5e7c?w=400&h=400&fit=crop",
    price: 85.0,
    quantity: 18,
    description: "Professional mixing tools set including trowels, mixers, and buckets.",
    supplierName: "ToolMaster Pro",
    category: "Tools & Equipment",
    status: "in-stock",
  },
  {
    id: "20",
    name: "Safety Gloves (Pack of 10)",
    image: "https://images.unsplash.com/photo-1581092916332-c7e5b9c8b2c9?w=400&h=400&fit=crop",
    price: 18.0,
    quantity: 75,
    description: "Heavy-duty work gloves with grip. Pack contains 10 pairs.",
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
