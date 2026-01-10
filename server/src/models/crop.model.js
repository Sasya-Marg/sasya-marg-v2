import mongoose from 'mongoose'

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },

    img: {
        url: String,
        publicId: String
    },

    suitableSoilType: {
        type: [String],
        enum: [
            "sandy",
            "clay",
            "loamy",
            "silty",
            "black",
            "red",
            "laterite",
            "alluvial",
            "arid"],
        required: true
    },

    seasons: {
        type: [String],
        enum: [
            "kharif",
            "rabi",
            "zaid",
            "summer",
            "winter",
            "monsoon",
            "post-monsoon"
        ],
        required: true
    },
    temperatureRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },

    rainfallRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },

    budgetRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },

    soilFertility: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    },

    durationRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }

}, { timestamps: true })


export const Crop = mongoose.model('Crop', cropSchema)