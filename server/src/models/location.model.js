import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    locality: String,
    state: String,
    district: String,
    country: String,
    coordinates: {
        lat: Number,
        lon: Number
    }

}, { timestamps: true })


export const Location = mongoose.model("Location", locationSchema)