import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { getSuggestionSchema } from '../validator/cropSuggestion.validator.js'
import { getSuggestion } from '../controllers/cropRecommendation.controller.js'
import { getSuggestionLimiter } from '../middleware/rate limiter/suggestionRateLimiter.js'


export const suggestionRoutes = Router()


suggestionRoutes.get("/:farmLandId", getSuggestionLimiter, validate(getSuggestionSchema), authLayer, getSuggestion)


