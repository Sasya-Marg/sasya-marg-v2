import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { getWeatherService } from '../services/weather.service.js'


export const getWeather = asyncHandler(async (req, res) => {
    const { locationId } = req.params
    const type = req?.query?.type || "all"

    const weather = await getWeatherService(locationId, type)

    return res.status(200).json(new ApiResponse(200, weather, "Weather fetched successfully"))
})