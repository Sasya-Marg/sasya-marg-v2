import { ApiError } from '../utils/apiError.js'
import { ZodError } from "zod"

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })

        next()
    } catch (error) {
        console.log("Zod validation Error >>>", error)
        if (error instanceof ZodError) {
            const message = error.issues[0]?.message || "Invalid data fields"
            return next(new ApiError(400, message))
        }
        next(error)
    }
}