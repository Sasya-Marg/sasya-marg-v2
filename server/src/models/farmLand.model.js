import mongoose from 'mongoose'

const farmLandSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true,
        index: true
    },

    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    size: {
        value: {
            type: Number,
            required: true,
            min: 0.01
        },
        unit: {
            type: String,
            enum: ["sqft", "sqm", "acre", "hectare", "beegha"],
            required: true
        }
    },
    soilType: {
        type: String,
        required: true
    },
    water: {
        type: {
            type: String,
            required: true
        },
        source: String
    },

    budget: Number,

    farmingType: {
        type: String,
        enum: ["organic", "conventional"],
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


export const FarmLand = mongoose.model("FarmLand", farmLandSchema)