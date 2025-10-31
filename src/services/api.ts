import axios from "axios";
import { Labour, StockItem } from "@/types";
import { User } from "@/context/UserContext";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "/api", // This would be your actual API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

// Labour API calls
export const labourApi = {
  getAll: async (): Promise<Labour[]> => {
    const response = await api.get("/labours");
    return response.data;
  },

  getById: async (id: string): Promise<Labour> => {
    const response = await api.get(`/labours/${id}`);
    return response.data;
  },

  create: async (labour: Omit<Labour, "id">): Promise<Labour> => {
    const response = await api.post("/labours", labour);
    return response.data;
  },

  update: async (id: string, labour: Partial<Labour>): Promise<Labour> => {
    const response = await api.put(`/labours/${id}`, labour);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/labours/${id}`);
  },
};

// Stock Item API calls
export const itemApi = {
  getAll: async (): Promise<StockItem[]> => {
    const response = await api.get("/items");
    return response.data;
  },

  getById: async (id: string): Promise<StockItem> => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  create: async (item: Omit<StockItem, "id">): Promise<StockItem> => {
    const response = await api.post("/items", item);
    return response.data;
  },

  update: async (id: string, item: Partial<StockItem>): Promise<StockItem> => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/items/${id}`);
  },
};

// User API calls
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (user: Omit<User, "id">): Promise<User> => {
    const response = await api.post("/users", user);
    return response.data;
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

export default api;
