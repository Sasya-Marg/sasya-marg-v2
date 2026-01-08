import { z } from 'zod'

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");




export const addPreviousCrop = z.object({
    params: z.object({
        farmLandId: objectId
    }),

    body: z.object({
        name: z.string().min(2).trim(),
        year: z.number().optional(),
        season: z.enum(["summer", "winter", "monsoon", "post-monsoon"])
    })
})