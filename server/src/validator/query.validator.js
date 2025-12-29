import { z } from "zod"

export const createQuerySchema = z.object({
  body: z.object({
    fullname: z.string().min(3, "Full name is required"),

    email: z.string().email("Invalid email address"),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    inquiry: z.enum([
      "crop",
      "product",
      "weather",
      "pricing",
      "technical",
      "other"
    ]),

    subject: z.string().min(5, "Subject is too short"),

    message: z.string().min(10, "Message is too short"),

    priority: z
      .enum(["low", "medium", "high", "urgent"])
      .optional()
  })
})
