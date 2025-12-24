import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { addPreviousCropService, updatePreviousCropService } from '../services/previousCrop.service.js'

export const addPreviousCrop = asyncHandler(async (req, res) => {
    const { name, season } = req.body
    const year = req.body?.year || null
    const { farmLandId } = req.params

    const previousCrop = await addPreviousCropService({ farmLandId, year, name, season })

    return res.status(201).json(new ApiResponse(200, previousCrop, "Previous crop added successfully"))

})

export const updatePreviousCrop = asyncHandler(async (req, res) => {
    const { name, season } = req.body
    const year = req.body?.year || null
    const { farmLandId } = req.params

    const previousCrop = await updatePreviousCropService({ farmLandId, year, name, season })

    return res.status(201).json(new ApiResponse(200, previousCrop, "Previous crop updated successfully"))

})