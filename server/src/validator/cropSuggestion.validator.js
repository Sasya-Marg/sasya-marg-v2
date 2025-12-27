import { z } from 'zod'

const objectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");



export const getSuggestionSchema = z.object({
    params: z.object({
        farmLandId: objectId
    })
})


export const getAllPredictHistorySchema = z.object({
    query: z.object({
        farmLandId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format").optional()
    })
})

export const getSinglePredictHistorySchema = z.object({
    params: z.object({
        predictionId: objectId
    })
})