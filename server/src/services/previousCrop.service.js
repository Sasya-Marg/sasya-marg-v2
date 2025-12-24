import { PreviousCrop } from "../models/previousCrop.model.js"
import { ApiError } from "../utils/apiError.js"

export const addPreviousCropService = async ({ farmLandId, name, season, year = null }) => {

    const exists = await PreviousCrop.findOne({ farmLand: farmLandId })

    if (exists) {
        throw new ApiError(
            409,
            "Previous crop already exists. Please update it instead."
        )
    }

    const previousCrop = await PreviousCrop.create({
        farmLand: farmLandId,
        name,
        season,
        year
    })


    return previousCrop
}


export const updatePreviousCropService = async ({ farmLandId, name, season, year = null }) => {
    const previousCrop = await PreviousCrop.findOneAndUpdate(
        {
            farmLand: farmLandId
        },
        {
            name,
            season,
            year
        },
        {
            new: true
        }

    )

    if (!previousCrop) {
        throw new ApiError(404, "Previous crop not found for this farmland")
    }


    return previousCrop
}