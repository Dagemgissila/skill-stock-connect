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
  {
    id: "8",
    name: "Lisa Anderson",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop",
    profession: "HVAC Technician",
    price: 135,
    priceUnit: "day",
    rating: 4.7,
    experience: "7 years",
    skills: ["AC Installation", "Heating Systems", "Ventilation", "Maintenance"],
    description: "Certified HVAC technician with expertise in installation and maintenance of heating, ventilation, and air conditioning systems.",
    phone: "+1 234 567 8908",
    email: "lisa.anderson@example.com",
    available: true,
  },
  {
    id: "9",
    name: "Robert Kim",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    profession: "Roofer",
    price: 145,
    priceUnit: "day",
    rating: 4.8,
    experience: "11 years",
    skills: ["Roof Installation", "Repair", "Waterproofing", "Gutter Systems"],
    description: "Professional roofer specializing in residential and commercial roofing projects. Expert in various roofing materials and techniques.",
    phone: "+1 234 567 8909",
    email: "robert.kim@example.com",
    available: true,
  },
  {
    id: "10",
    name: "Jennifer Lee",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    profession: "Interior Designer",
    price: 180,
    priceUnit: "day",
    rating: 4.9,
    experience: "9 years",
    skills: ["Space Planning", "Color Coordination", "3D Rendering", "Project Management"],
    description: "Creative interior designer with a keen eye for detail and modern aesthetics. Specializes in residential and commercial spaces.",
    phone: "+1 234 567 8910",
    email: "jennifer.lee@example.com",
    available: false,
  },
  {
    id: "11",
    name: "Carlos Martinez",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    profession: "Tile Installer",
    price: 125,
    priceUnit: "day",
    rating: 4.6,
    experience: "8 years",
    skills: ["Floor Tiling", "Wall Tiling", "Mosaic Work", "Waterproofing"],
    description: "Skilled tile installer with experience in ceramic, porcelain, and natural stone installations. Precise and clean workmanship.",
    phone: "+1 234 567 8911",
    email: "carlos.martinez@example.com",
    available: true,
  },
  {
    id: "12",
    name: "Anna Williams",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    profession: "Landscape Architect",
    price: 170,
    priceUnit: "day",
    rating: 4.8,
    experience: "10 years",
    skills: ["Garden Design", "Irrigation Systems", "Hardscaping", "Plant Selection"],
    description: "Experienced landscape architect creating beautiful outdoor spaces. Expert in sustainable and low-maintenance designs.",
    phone: "+1 234 567 8912",
    email: "anna.williams@example.com",
    available: true,
  },
  {
    id: "13",
    name: "Thomas Brown",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    profession: "Glazier",
    price: 140,
    priceUnit: "day",
    rating: 4.7,
    experience: "13 years",
    skills: ["Glass Cutting", "Window Installation", "Mirror Work", "Safety Glass"],
    description: "Professional glazier with extensive experience in glass installation and repair. Specializes in both residential and commercial projects.",
    phone: "+1 234 567 8913",
    email: "thomas.brown@example.com",
    available: true,
  },
  {
    id: "14",
    name: "Patricia Davis",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    profession: "Drywall Installer",
    price: 115,
    priceUnit: "day",
    rating: 4.5,
    experience: "6 years",
    skills: ["Drywall Hanging", "Taping", "Finishing", "Texturing"],
    description: "Skilled drywall installer providing quality interior wall and ceiling installations. Fast and efficient service.",
    phone: "+1 234 567 8914",
    email: "patricia.davis@example.com",
    available: true,
  },
  {
    id: "15",
    name: "Kevin White",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    profession: "Concrete Finisher",
    price: 130,
    priceUnit: "day",
    rating: 4.8,
    experience: "12 years",
    skills: ["Concrete Pouring", "Finishing", "Stamped Concrete", "Polishing"],
    description: "Expert concrete finisher with specialization in decorative and functional concrete work. High-quality finish guaranteed.",
    phone: "+1 234 567 8915",
    email: "kevin.white@example.com",
    available: false,
  },
  {
    id: "16",
    name: "Rachel Green",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    profession: "Flooring Specialist",
    price: 135,
    priceUnit: "day",
    rating: 4.9,
    experience: "9 years",
    skills: ["Hardwood Installation", "Laminate", "Vinyl", "Floor Refinishing"],
    description: "Professional flooring specialist with expertise in all types of floor installations. Meticulous attention to detail and quality.",
    phone: "+1 234 567 8916",
    email: "rachel.green@example.com",
    available: true,
  },
  {
    id: "17",
    name: "Daniel Wilson",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    profession: "Solar Panel Installer",
    price: 175,
    priceUnit: "day",
    rating: 4.8,
    experience: "5 years",
    skills: ["Solar Panel Installation", "Electrical Integration", "System Testing", "Maintenance"],
    description: "Certified solar panel installer committed to renewable energy solutions. Professional installation with optimal efficiency.",
    phone: "+1 234 567 8917",
    email: "daniel.wilson@example.com",
    available: true,
  },
  {
    id: "18",
    name: "Sophie Turner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    profession: "Kitchen Designer",
    price: 165,
    priceUnit: "day",
    rating: 4.7,
    experience: "8 years",
    skills: ["Kitchen Planning", "Cabinet Design", "Appliance Integration", "Space Optimization"],
    description: "Creative kitchen designer specializing in modern and functional kitchen spaces. Custom solutions for every budget.",
    phone: "+1 234 567 8918",
    email: "sophie.turner@example.com",
    available: true,
  },
  {
    id: "19",
    name: "Marcus Johnson",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    profession: "Demolition Specialist",
    price: 155,
    priceUnit: "day",
    rating: 4.6,
    experience: "14 years",
    skills: ["Safe Demolition", "Waste Management", "Site Clearing", "Structural Assessment"],
    description: "Professional demolition specialist with emphasis on safety and efficiency. Licensed and insured for all types of demolition work.",
    phone: "+1 234 567 8919",
    email: "marcus.johnson@example.com",
    available: true,
  },
  {
    id: "20",
    name: "Olivia Martinez",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    profession: "Architect",
    price: 220,
    priceUnit: "day",
    rating: 5.0,
    experience: "16 years",
    skills: ["Architectural Design", "3D Modeling", "Building Codes", "Project Coordination"],
    description: "Senior architect with award-winning designs. Specializes in sustainable and innovative architectural solutions for residential and commercial projects.",
    phone: "+1 234 567 8920",
    email: "olivia.martinez@example.com",
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
