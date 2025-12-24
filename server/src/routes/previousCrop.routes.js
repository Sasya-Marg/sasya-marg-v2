import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { addPreviousCrop as addPreviousCropValidator } from '../validator/previousCrop.validator.js'
import { addPreviousCrop, updatePreviousCrop } from '../controllers/previousCrop.controller.js'



export const previousCropRoutes = Router()

previousCropRoutes.post("/:farmLandId", validate(addPreviousCropValidator), authLayer, addPreviousCrop)

previousCropRoutes.patch("/:farmLandId", validate(addPreviousCropValidator), authLayer, updatePreviousCrop)