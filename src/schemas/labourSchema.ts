import { z } from "zod";

export const labourSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  profession: z.string().min(2, "Profession is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  priceUnit: z.enum(["hour", "day", "project"]),
  experience: z.coerce.number().min(0, "Experience must be positive"),
  rating: z.coerce.number().min(0).max(5, "Rating must be between 0 and 5").optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  available: z.boolean(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export type LabourFormData = z.infer<typeof labourSchema>;
