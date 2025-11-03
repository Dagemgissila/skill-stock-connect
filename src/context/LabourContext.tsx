import { createContext, useContext, useState, ReactNode } from "react";
import { Labour } from "@/types";

interface LabourContextType {
  labours: Labour[];
  addLabour: (labour: Labour) => void;
  updateLabour: (id: string, labour: Partial<Labour>) => void;
  deleteLabour: (id: string) => void;
  getLabourById: (id: string) => Labour | undefined;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isEditSheetOpen: boolean;
  setIsEditSheetOpen: (open: boolean) => void;
  selectedLabour: Labour | null;
  setSelectedLabour: (labour: Labour | null) => void;
}

const LabourContext = createContext<LabourContextType | undefined>(undefined);

// Mock data
const mockLabours: Labour[] = [
  {
    id: "1",
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    profession: "Electrician",
    price: 150,
    priceUnit: "day",
    rating: 4.8,
    experience: "8 years",
    skills: ["Wiring", "Circuit Design", "Troubleshooting", "Solar Installation"],
    description: "Experienced electrician specializing in residential and commercial electrical systems. Licensed and insured with a strong track record of quality work.",
    phone: "+1 234 567 8901",
    email: "john.smith@example.com",
    available: true,
  },
  {
    id: "2",
    name: "Maria Garcia",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    profession: "Plumber",
    price: 120,
    priceUnit: "day",
    rating: 4.9,
    experience: "10 years",
    skills: ["Pipe Installation", "Leak Repair", "Bathroom Fitting", "Emergency Services"],
    description: "Professional plumber with extensive experience in all types of plumbing work. Available for emergency calls and regular maintenance.",
    phone: "+1 234 567 8902",
    email: "maria.garcia@example.com",
    available: true,
  },
  {
    id: "3",
    name: "David Chen",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    profession: "Carpenter",
    price: 140,
    priceUnit: "day",
    rating: 4.7,
    experience: "12 years",
    skills: ["Furniture Making", "Cabinet Installation", "Wood Finishing", "Custom Design"],
    description: "Master carpenter specializing in custom furniture and woodwork. Attention to detail and quality craftsmanship guaranteed.",
    phone: "+1 234 567 8903",
    email: "david.chen@example.com",
    available: true,
  },
  {
    id: "4",
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    profession: "Painter",
    price: 100,
    priceUnit: "day",
    rating: 4.6,
    experience: "6 years",
    skills: ["Interior Painting", "Exterior Painting", "Wallpaper", "Decorative Finishes"],
    description: "Professional painter with expertise in both residential and commercial projects. Clean work and timely completion.",
    phone: "+1 234 567 8904",
    email: "sarah.johnson@example.com",
    available: true,
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    profession: "Mason",
    price: 130,
    priceUnit: "day",
    rating: 4.8,
    experience: "15 years",
    skills: ["Bricklaying", "Concrete Work", "Stone Masonry", "Restoration"],
    description: "Experienced mason with specialization in both modern and traditional masonry techniques. Quality work on time and within budget.",
    phone: "+1 234 567 8905",
    email: "ahmed.hassan@example.com",
    available: false,
  },
  {
    id: "6",
    name: "Emily Taylor",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    profession: "Welder",
    price: 160,
    priceUnit: "day",
    rating: 4.9,
    experience: "9 years",
    skills: ["MIG Welding", "TIG Welding", "Metal Fabrication", "Safety Certified"],
    description: "Certified welder with expertise in various welding techniques. Available for industrial and custom projects.",
    phone: "+1 234 567 8906",
    email: "emily.taylor@example.com",
    available: true,
  },
  {
    id: "7",
    name: "Michael Rodriguez",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    profession: "Civil Engineer",
    price: 200,
    priceUnit: "day",
    rating: 4.9,
    experience: "14 years",
    skills: ["Structural Design", "Project Management", "AutoCAD", "Site Supervision"],
    description: "Senior civil engineer with extensive experience in large-scale infrastructure projects. Expert in structural design, project planning, and construction management.",
    phone: "+1 234 567 8907",
    email: "michael.rodriguez@example.com",
    available: true,
  },
];

export function LabourProvider({ children }: { children: ReactNode }) {
  const [labours, setLabours] = useState<Labour[]>(mockLabours);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState<Labour | null>(null);

  const addLabour = (labour: Labour) => {
    setLabours([...labours, labour]);
  };

  const updateLabour = (id: string, updatedLabour: Partial<Labour>) => {
    setLabours(
      labours.map((labour) =>
        labour.id === id ? { ...labour, ...updatedLabour } : labour
      )
    );
  };

  const deleteLabour = (id: string) => {
    setLabours(labours.filter((labour) => labour.id !== id));
  };

  const getLabourById = (id: string) => {
    return labours.find((labour) => labour.id === id);
  };

  return (
    <LabourContext.Provider
      value={{
        labours,
        addLabour,
        updateLabour,
        deleteLabour,
        getLabourById,
        isAddModalOpen,
        setIsAddModalOpen,
        isEditSheetOpen,
        setIsEditSheetOpen,
        selectedLabour,
        setSelectedLabour,
      }}
    >
      {children}
    </LabourContext.Provider>
  );
}

export function useLabour() {
  const context = useContext(LabourContext);
  if (context === undefined) {
    throw new Error("useLabour must be used within a LabourProvider");
  }
  return context;
}
