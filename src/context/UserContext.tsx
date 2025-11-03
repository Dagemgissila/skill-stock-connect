import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  phone: string;
  joinedDate: string;
  status: "active" | "inactive";
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    phone: "+1 234 567 1000",
    joinedDate: "2023-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "John Contractor",
    email: "john.contractor@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    phone: "+1 234 567 1001",
    joinedDate: "2023-03-20",
    status: "active",
  },
  {
    id: "3",
    name: "Sarah Builder",
    email: "sarah.builder@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    phone: "+1 234 567 1002",
    joinedDate: "2023-05-10",
    status: "active",
  },
  {
    id: "4",
    name: "Mike Projects",
    email: "mike.projects@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    phone: "+1 234 567 1003",
    joinedDate: "2023-07-22",
    status: "inactive",
  },
  {
    id: "5",
    name: "Emily Design",
    email: "emily.design@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    phone: "+1 234 567 1004",
    joinedDate: "2023-09-05",
    status: "active",
  },
  {
    id: "6",
    name: "David Thompson",
    email: "david.thompson@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    phone: "+1 234 567 1005",
    joinedDate: "2023-10-12",
    status: "active",
  },
  {
    id: "7",
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    phone: "+1 234 567 1006",
    joinedDate: "2023-11-08",
    status: "active",
  },
  {
    id: "8",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    phone: "+1 234 567 1007",
    joinedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "9",
    name: "Jennifer Wilson",
    email: "jennifer.wilson@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop",
    phone: "+1 234 567 1008",
    joinedDate: "2024-02-20",
    status: "inactive",
  },
  {
    id: "10",
    name: "Kevin Brown",
    email: "kevin.brown@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    phone: "+1 234 567 1009",
    joinedDate: "2024-03-10",
    status: "active",
  },
  {
    id: "11",
    name: "Amanda Davis",
    email: "amanda.davis@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    phone: "+1 234 567 1010",
    joinedDate: "2024-04-05",
    status: "active",
  },
  {
    id: "12",
    name: "Chris Anderson",
    email: "chris.anderson@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    phone: "+1 234 567 1011",
    joinedDate: "2024-05-12",
    status: "active",
  },
  {
    id: "13",
    name: "Michelle Taylor",
    email: "michelle.taylor@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    phone: "+1 234 567 1012",
    joinedDate: "2024-06-01",
    status: "active",
  },
  {
    id: "14",
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    phone: "+1 234 567 1013",
    joinedDate: "2024-07-08",
    status: "inactive",
  },
  {
    id: "15",
    name: "Patricia White",
    email: "patricia.white@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    phone: "+1 234 567 1014",
    joinedDate: "2024-08-14",
    status: "active",
  },
  {
    id: "16",
    name: "James Moore",
    email: "james.moore@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    phone: "+1 234 567 1015",
    joinedDate: "2024-09-20",
    status: "active",
  },
  {
    id: "17",
    name: "Nancy Garcia",
    email: "nancy.garcia@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    phone: "+1 234 567 1016",
    joinedDate: "2024-10-05",
    status: "active",
  },
  {
    id: "18",
    name: "Brian Jackson",
    email: "brian.jackson@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    phone: "+1 234 567 1017",
    joinedDate: "2024-10-18",
    status: "active",
  },
  {
    id: "19",
    name: "Laura Martin",
    email: "laura.martin@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    phone: "+1 234 567 1018",
    joinedDate: "2024-11-02",
    status: "inactive",
  },
  {
    id: "20",
    name: "Steven Thompson",
    email: "steven.thompson@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    phone: "+1 234 567 1019",
    joinedDate: "2024-11-15",
    status: "active",
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const getUserById = (id: string) => {
    return users.find((user) => user.id === id);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
