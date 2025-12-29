import { z } from 'zod'

export const bootstrapSuperAdminSchema = z.object({
  body: z.object({
    fullname: z.string().trim().min(2),
    phone: z.string().length(10),
    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase()
      .trim(),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),

    secret: z
      .string()
      .min(5, "Invalid bootstrap secret")
  })
})


export const adminLoginSchema = z.object({
  body: z.object({
    identifier: z
      .string()
      .min(3, "Email or phone is required")
      .refine(
        (val) =>
          /^[6-9]\d{9}$/.test(val) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        {
          message: "Identifier must be a valid email or phone number"
        }
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
  })
})

export const registerAdminSchema = z.object({
  query: z.object({
    inviteToken: z.string().length(64)
  }),

  body: z.object({
    fullname: z.string().min(3),
    email: z.string().email(),
    phone: z.string().length(10).regex(/^[6-9]\d{9}$/),
    password: z.string().min(8)
  })
})
