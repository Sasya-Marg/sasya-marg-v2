import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { addPreviousCrop as addPreviousCropValidator } from '../validator/previousCrop.validator.js'
import { addPreviousCrop, updatePreviousCrop } from '../controllers/previousCrop.controller.js'
import { previousCropLimiter } from '../middleware/rate limiter/previousCropLimiter.js'



export const previousCropRoutes = Router()

previousCropRoutes.post("/:farmLandId", previousCropLimiter, validate(addPreviousCropValidator), authLayer, addPreviousCrop)

previousCropRoutes.patch("/:farmLandId", previousCropLimiter, validate(addPreviousCropValidator), authLayer, updatePreviousCrop)