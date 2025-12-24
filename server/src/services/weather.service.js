import { Weather } from "../models/weather.model.js"
import { ApiError } from "../utils/apiError.js"
import { Location } from '../models/location.model.js'
import axios from 'axios'

const getCurrentWeather = async (location) => {
    try {
        const {
            coordinates: { lat, lon }
        } = location

        const { data } = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    lat,
                    lon,
                    units: "metric",
                    appid: process.env.OPENWEATHER_API
                }
            }
        )

        return {
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            condition: data.weather?.[0]?.main ?? "unknown",
            fetchedAt: new Date()
        }

    } catch (error) {
        console.error("OpenWeather current fetch failed:", error.message)

        throw new ApiError(
            500,
            `Current weather fetch failed: ${error.message}`
        )
    }
}


const getWeatherForecast = async (location) => {
    try {
        const { lat, lon } = location.coordinates

        const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
                latitude: lat,
                longitude: lon,
                daily: [
                    "temperature_2m_min",
                    "temperature_2m_max",
                    "precipitation_probability_max",
                    "precipitation_sum",
                    "windspeed_10m_max"
                ].join(","),
                forecast_days: 16,
                timezone: "auto"
            }
        })

        return data.daily.time.map((date, i) => ({
            date: new Date(date),
            minTemp: data.daily.temperature_2m_min[i],
            maxTemp: data.daily.temperature_2m_max[i],
            rainChance: data.daily.precipitation_probability_max[i],
            rainAmount: data.daily.precipitation_sum[i],
            windSpeed: data.daily.windspeed_10m_max[i]
        }))

    } catch (error) {
        console.error("OpenWeather current fetch failed:", error.message)

        throw new ApiError(
            500,
            `Weather forecast fetch failed: ${error.message}`
        )
    }
}



const CURRENT_TTL = 15 * 60 * 1000
const FORECAST_TTL = 6 * 60 * 60 * 1000
const DOC_TTL = 24 * 60 * 60 * 1000




export const getWeatherService = async (locationId, type = "all") => {
    const now = Date.now()

    const location = await Location.findById(locationId)

    if (!location) {
        throw new ApiError(404, "No location found")
    }

    let weather = await Weather.findOne({ location: location._id })

    let shouldFetchCurrent = false
    let shouldFetchForecast = false

    if (!weather) {
        shouldFetchCurrent = true
        shouldFetchForecast = true
    } else {
        if (!weather.current?.fetchedAt || now - weather.current.fetchedAt.getTime() > CURRENT_TTL) {
            shouldFetchCurrent = true
        }

        if (!weather.forecast?.fetchedAt || now - weather.forecast.fetchedAt.getTime() > FORECAST_TTL) {
            shouldFetchForecast = true
        }
    }

    const update = {}

    if (shouldFetchCurrent) {
        update.current = await getCurrentWeather(location)
    }

    if (shouldFetchForecast) {
        update.forecast = {
            days: await getWeatherForecast(location),
            fetchedAt: new Date()
        }
    }


    if (!weather) {
        weather = await Weather.create({
            location: location._id,
            ...update,
            expiresAt: new Date(now + DOC_TTL)
        })
    } else if (Object.keys(update).length) {
        weather = await Weather.findOneAndUpdate(
            { _id: weather._id },
            {
                $set:
                {
                    ...update,
                    expiresAt: new Date(now + DOC_TTL)
                }
            },
            { new: true }
        )
    }

    if (type === "current") return weather.current

    if (type === "forecast") return weather.forecast

    return {
        current: weather.current,
        forecast: weather.forecast
    }
}