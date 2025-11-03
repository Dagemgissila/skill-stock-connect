import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Item name is required").max(100, "Name must be less than 100 characters"),
  category: z.string().min(1, "Category is required").max(50, "Category must be less than 50 characters"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be a positive integer"),
  supplierName: z.string().max(100, "Supplier name must be less than 100 characters").optional(),
  image: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  status: z.enum(["in-stock", "low-stock", "out-of-stock"]),
});

export type ItemFormData = z.infer<typeof itemSchema>;
