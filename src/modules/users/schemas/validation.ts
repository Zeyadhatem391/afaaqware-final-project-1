import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export const loginSchema = registerSchema.omit({
  name: true,
});