import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { getAllPredictHistorySchema, getSinglePredictHistorySchema } from '../validator/cropSuggestion.validator.js'
import { getPredictedHistory, getSinglePredictHistory } from '../controllers/predictHistory.controller.js'


export const historyRoutes = Router()

historyRoutes.get('/', validate(getAllPredictHistorySchema), authLayer, getPredictedHistory)
historyRoutes.get('/:predictionId', validate(getSinglePredictHistorySchema), authLayer, getSinglePredictHistory)