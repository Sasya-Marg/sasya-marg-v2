import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { createFarmLandSchema, updateFarmLandSchema, toggleFarmLandStatus } from '../validator/farmLand.validator.js'
import { createFarmLand, getAllFarms, toggleFarmLandActiveStatus, updateFarmLand } from '../controllers/farmLand.controller.js'


export const farmLandRoutes = Router()


farmLandRoutes.post('/create', validate(createFarmLandSchema), authLayer, createFarmLand)

farmLandRoutes.get('/', authLayer, getAllFarms)

farmLandRoutes.patch('/:farmLandId', validate(updateFarmLandSchema), authLayer, updateFarmLand)

farmLandRoutes.patch('/active-status/:farmLandId', validate(toggleFarmLandStatus), authLayer, toggleFarmLandActiveStatus)