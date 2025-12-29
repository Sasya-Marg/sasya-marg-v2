import { z } from 'zod'

export const QUANTITY_UNITS = ["kg", "quintal", "ton"]
export const PRICE_UNITS = ["per_kg", "per_quintal", "per_ton"]
export const QUALITY_GRADES = ["A", "B", "C", "organic"]
export const LISTING_STATUS = ["open", "booked", "harvested", "cancelled"]
export const MODERATION_STATUS = ["pending", "approved", "rejected"]

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");


export const createPreHarvestListingSchema = z.object({
    body: z.object({
        payload: z.object({
            farmland: objectId,
            title: z.string().min(5).max(120),
            sowingDate: z.coerce.date(),
            expectedHarvest: z.coerce.date(),
            expectedyeild: z.object({
                value: z.number().positive(),
                unit: z.enum(QUANTITY_UNITS)
            }).optional(),
            expectedPrice: z.object({
                value: z.number().positive(),
                unit: z.enum(PRICE_UNITS)
            }).optional(),
            minimumOrderQuantity: z.object({
                value: z.number().positive(),
                unit: z.enum(QUANTITY_UNITS)
            }).optional(),
            qualityGrade: z.enum(QUALITY_GRADES).optional(),
            description: z.string().optional()
        })
    })
})


export const getPreHarvestListingQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().max(50).optional(),

        state: z.string().min(2).optional(),
        city: z.string().min(2).optional(),

        qualityGrade: z.enum(["A", "B", "C", "organic"]).optional(),

        minPrice: z.coerce.number().positive().optional(),
        maxPrice: z.coerce.number().positive().optional(),

        sort: z.enum(["price_asc", "price_desc", "newest"]).optional()
    })
})

export const getMyPreHarvestListingQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().max(50).optional(),
        status: z.enum(["open", "booked", "harvested", "cancelled"]).optional(),
        moderation: z.enum(["pending", "approved", "rejected"]).optional()
    })
})


export const getSinglePreHarvestListingSchema = z.object({
    params: z.object({
        listingId: objectId
    })
})


export const updatePreHarvestListingSchema = z.object({
    params: z.object({
        listingId: objectId
    }),

    body: z.object({
        title: z.string().min(2).max(120).optional(),
        description: z.string().min(2).optional(),
        qualityGrade: z.enum(QUALITY_GRADES).optional(),
        minimumOrderQuantity: z.object({
            value: z.number().positive().optional(),
            unit: z.enum(QUANTITY_UNITS).optional()
        }).optional(),
        expectedPrice: z.object({
            value: z.number().positive().optional(),
            unit: z.enum(PRICE_UNITS).optional()
        }).optional(),
        expectedyeild: z.object({
            value: z.number().positive().optional(),
            unit: z.enum(QUANTITY_UNITS).optional()
        }).optional(),
        expectedHarvest: z.coerce.date().optional(),
        removeImages: z.array(z.string()).optional()
    }).optional()
})