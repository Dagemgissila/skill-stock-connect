import { z } from "zod";

export const labourSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  profession: z.string().min(1, "Profession is required").max(50, "Profession must be less than 50 characters"),
  price: z.number().min(0, "Price must be positive"),
  priceUnit: z.enum(["day", "hour"]),
  experience: z.string().min(1, "Experience is required").max(50, "Experience must be less than 50 characters"),
  image: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  available: z.boolean(),
});

export type LabourFormData = z.infer<typeof labourSchema>;
