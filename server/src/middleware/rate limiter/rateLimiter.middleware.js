import rateLimit from "express-rate-limit"
import { ApiError } from "../../utils/apiError.js"

export const createLimiter = (options) => {
    console.log("Request in rate Limiter middleware")
    return rateLimit({
        windowMs: options.windowMs,
        max: options.max,
        keyGenerator: options.keyGenerator,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            next(new ApiError(429, options.message))
        }
    })
}
