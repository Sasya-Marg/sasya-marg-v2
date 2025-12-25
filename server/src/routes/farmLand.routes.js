import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { createFarmLandSchema, updateFarmLandSchema, toggleFarmLandStatus } from '../validator/farmLand.validator.js'
import { createFarmLand, getAllFarms, toggleFarmLandActiveStatus, updateFarmLand } from '../controllers/farmLand.controller.js'
import { FarmLandLimiter, changeActiveStatusLimiter, getFarmLand } from '../middleware/rate limiter/farmlandRateLimiter.js'

export const farmLandRoutes = Router()


farmLandRoutes.post('/create', FarmLandLimiter, validate(createFarmLandSchema), authLayer, createFarmLand)

farmLandRoutes.get('/', getFarmLand, authLayer, getAllFarms)

farmLandRoutes.patch('/:farmLandId', FarmLandLimiter, validate(updateFarmLandSchema), authLayer, updateFarmLand)

farmLandRoutes.patch('/active-status/:farmLandId', changeActiveStatusLimiter, validate(toggleFarmLandStatus), authLayer, toggleFarmLandActiveStatus)