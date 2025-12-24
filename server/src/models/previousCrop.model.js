import mongoose from 'mongoose'

const previousCropScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    farmLand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FarmLand",
        required: true
    },

    season: {
        type: String,
        enum: ["summer", "winter", "monsoon", "post-monsoon"],
        required: true
    },

    year: String,


}, { timestamps: true })


export const PreviousCrop = mongoose.model("PreviousCrop", previousCropScheme)