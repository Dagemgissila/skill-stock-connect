import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(2, "Category is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  quantity: z.coerce.number().min(0, "Quantity must be positive"),
  supplierName: z.string().min(2, "Supplier name is required"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["in-stock", "low-stock", "out-of-stock"]),
});

export type ItemFormData = z.infer<typeof itemSchema>;
