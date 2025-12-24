import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { getWeatherSchema } from '../validator/weather.validator.js'
import { getWeather } from '../controllers/weather.controller.js'


export const weatherRoutes = Router()


weatherRoutes.get("/:locationId", validate(getWeatherSchema), authLayer, getWeather)