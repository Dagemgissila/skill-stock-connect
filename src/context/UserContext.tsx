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
