import { z } from "zod"

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");


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
      "account",
      "other"
    ]),

    subject: z.string().min(5, "Subject is too short"),

    message: z.string().min(10, "Message is too short"),

    priority: z
      .enum(["low", "medium", "high", "urgent"])
      .optional()
  })
})


export const viewMyQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.enum(["open", "in_progress", "resolved", "closed"]).optional()
  })
})


export const viewSingleQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  })
})

export const updateQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  }),

  body: z.object({
    message: z.string().min(5).optional(),
    subject: z.string().min(5).optional()
  })
})

export const closeQuerySchema = z.object({
  params: z.object({
    queryId: objectId
  })
})
