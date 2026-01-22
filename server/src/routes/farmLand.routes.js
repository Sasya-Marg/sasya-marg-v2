import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { createFarmLandSchema, updateFarmLandSchema, toggleFarmLandStatus, getSingleFarmlandSchema } from '../validator/farmLand.validator.js'
import { createFarmLand, getAllFarms, getSingleFarmland, toggleFarmLandActiveStatus, updateFarmLand } from '../controllers/farmLand.controller.js'
import { FarmLandLimiter, changeActiveStatusLimiter, getFarmLand } from '../middleware/rate limiter/farmlandRateLimiter.js'
import { authorize } from '../middleware/role.middleware.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'


export const farmLandRoutes = Router()


farmLandRoutes.post('/create', FarmLandLimiter, validate(createFarmLandSchema), authLayer, activeFarmer, authorize("farmer"), createFarmLand)

farmLandRoutes.get('/', getFarmLand, authLayer, activeFarmer, getAllFarms)

farmLandRoutes.patch('/:farmLandId', FarmLandLimiter, validate(updateFarmLandSchema), authLayer, activeFarmer, authorize("farmer"), updateFarmLand)

farmLandRoutes.patch('/active-status/:farmLandId', changeActiveStatusLimiter, validate(toggleFarmLandStatus), authLayer, activeFarmer, authorize("farmer"), toggleFarmLandActiveStatus)

farmLandRoutes.get("/:farmlandId", validate(getSingleFarmlandSchema), authLayer, activeFarmer, authorize("farmer"), getSingleFarmland)