import { z } from 'zod'


const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const getWeatherSchema = z.object({
    params: z.object({
        locationId: objectId
    }),
    query: z.object({
        type: z.enum(["current", "forecast", "all"]).optional()
    })
})