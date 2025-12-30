import { z } from "zod"
import mongoose from "mongoose"

const objectId = z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    "Invalid ObjectId"
)

const categoryEnum = z.enum(["vegetable", "fruit", "grain"])
const priceUnitEnum = z.enum(["per_kg", "per_quintal", "per_ton"])
const stockUnitEnum = z.enum(["kg", "quintal", "ton"])
const moderationEnum = z.enum(["pending", "approved", "rejected"])

export const createProductSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(100),
        description: z.string().min(10),
        farmlandId: objectId,
        category: categoryEnum,
        price: z.object({
            value: z.coerce.number().positive(),
            unit: priceUnitEnum
        }),
        stock: z.object({
            value: z.coerce.number().positive(),
            unit: stockUnitEnum
        })
    })
})

export const updateProductSchema = z.object({
    params: z.object({
        listingId: objectId
    }),
    body: z.object({
        title: z.string().min(3).max(100).optional(),
        description: z.string().min(10).optional(),
        category: categoryEnum.optional(),
        price: z.object({
            value: z.number().positive(),
            unit: priceUnitEnum
        }).optional(),
        stock: z.object({
            value: z.number().positive(),
            unit: stockUnitEnum
        }).optional(),
        isActive: z.boolean().optional()
    }).strict()
})

export const myProductListingQuerySchema = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional(),
        isActive: z.enum(["true", "false"]).optional(),
        moderation: moderationEnum.optional()
    })
})

export const toggleProductSchema = z.object({
    params: z.object({
        listingId: objectId
    })
})

export const getProductListingSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().max(50).optional(),

        state: z.string().min(2).optional(),
        district: z.string().min(2).optional(),
        category: z.enum(["vegetable", "fruit", "grain"]).optional(),
        qualityGrade: z.enum(["A", "B", "C", "organic"]).optional(),

        minPrice: z.coerce.number().positive().optional(),
        maxPrice: z.coerce.number().positive().optional(),

        sort: z.enum(["price_asc", "price_desc", "newest"]).optional()
    })
})
