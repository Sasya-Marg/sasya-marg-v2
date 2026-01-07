import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { createFarmLandSchema, updateFarmLandSchema, toggleFarmLandStatus, getSingleFarmlandSchema } from '../validator/farmLand.validator.js'
import { createFarmLand, getAllFarms, getSingleFarmland, toggleFarmLandActiveStatus, updateFarmLand } from '../controllers/farmLand.controller.js'
import { FarmLandLimiter, changeActiveStatusLimiter, getFarmLand } from '../middleware/rate limiter/farmlandRateLimiter.js'
import { authorize } from '../middleware/role.middleware.js'


export const farmLandRoutes = Router()


farmLandRoutes.post('/create', FarmLandLimiter, validate(createFarmLandSchema), authLayer, authorize("farmer"), createFarmLand)

farmLandRoutes.get('/', getFarmLand, authLayer, getAllFarms)

farmLandRoutes.patch('/:farmLandId', FarmLandLimiter, validate(updateFarmLandSchema), authLayer, authorize("farmer"), updateFarmLand)

farmLandRoutes.patch('/active-status/:farmLandId', changeActiveStatusLimiter, validate(toggleFarmLandStatus), authLayer, authorize("farmer"), toggleFarmLandActiveStatus)

farmLandRoutes.get("/:farmlandId", validate(getSingleFarmlandSchema), authLayer, authorize("farmer"), getSingleFarmland)