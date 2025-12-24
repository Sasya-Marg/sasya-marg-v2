import { z } from 'zod'

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");


export const createFarmLandSchema = z.object({
    body: z.object({
        location: z.object({
            locality: z.string().optional(),
            district: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),
            coordinates: z.object({
                lat: z.number().optional(),
                lon: z.number().optional()
            }).optional()
        }),

        name: z.string(),

        size: z.object({
            value: z.number().positive(),
            unit: z.enum(["sqft", "sqm", "acre", "hectare", "beegha"])
        }),

        soilType: z.string(),

        farmingType: z.enum(["organic", "conventional"]),

        water: z.object({
            type: z.string(),
            source: z.string()
        }),

        budget: z.number().optional()
    })
})

export const updateFarmLandSchema = z.object({
    params: z.object({
        farmLandId: objectId
    }),

    body: z.object({
        name: z.string().optional(),
        size: z.object({
            value: z.number().optional(),
            unit: z.string().optional()
        }).optional(),
        soilType: z.string().optional(),
        water: z.object({
            type: z.string().optional(),
            source: z.string().optional(),
        }).optional(),
        budget: z.number().optional(),
        farmingType: z.string().optional()
    })
})

export const toggleFarmLandStatus = z.object({
    params: z.object({
        farmLandId: objectId
    }),
})