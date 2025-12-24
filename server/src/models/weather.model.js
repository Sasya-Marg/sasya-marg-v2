import mongoose from 'mongoose'

const weatherSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
        unique: true,
        index: true
    },

    current: {
        temperature: { type: Number, default: null },
        feelsLike: { type: Number, default: null },
        humidity: { type: Number, default: null },
        windSpeed: { type: Number, default: null },
        condition: { type: String, default: "unknown" },

        provider: {
            type: String,
            enum: ['openweather'],
            default: "openweather"
        },

        fetchedAt: { type: Date, default: null }
    },

    forecast: {
        days: {
            type: [
                {
                    date: Date,
                    minTemp: Number,
                    maxTemp: Number,
                    rainChance: Number,
                    rainAmount: Number,
                    windSpeed: Number
                }
            ],
            default: []
        },

        fetchedAt: {
            type: Date,
            default: null
        },

        provider: {
            type: String,
            enum: ["open-meteo"],
            default: "open-meteo"
        },

    },

    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    }

}, { timestamps: true })

export const Weather = mongoose.model("Weather", weatherSchema)