import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from "../utils/apiResponse.js";
import { createFarmLandService, getAllFarmsService, getFarmlandFromId, toggleFarmLandActiveStatusService, updateFarmLandService } from '../services/farmLand.service.js';

export const createFarmLand = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const farmland = await createFarmLandService({ farmerId, payload: req.body })

    return res.status(201).json(new ApiResponse(201, farmland, "Farmland created successfully"))
})


export const getAllFarms = asyncHandler(async (req, res) => {
    const farmlands = await getAllFarmsService({ farmerId: req.user._id })

    if (!farmlands || farmlands.length === 0) return res.status(200).json(new ApiResponse(200, [], 'No farmland found'))

    return res.status(200).json(new ApiResponse(200, farmlands, "Farmland fetched successfully"))
})

export const updateFarmLand = asyncHandler(async (req, res) => {
    const farmland = await updateFarmLandService({ farmerId: req.user._id, payload: req.body, farmLandId: req.params.farmLandId })

    return res.status(200).json(new ApiResponse(200, farmland, "Farm data updated successfully"))
})

export const toggleFarmLandActiveStatus = asyncHandler(async (req, res) => {
    const { farmLandId } = req.params
    const farmland = await toggleFarmLandActiveStatusService({ farmLandId, farmerId: req.user._id })

    return res.status(200).json(new ApiResponse(200, farmland, "Active status is changes for farmland"))
})

export const getSingleFarmland = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { farmlandId } = req.params
    const farmland = await getFarmlandFromId({ farmerId, farmlandId })

    return res.status(200).json(new ApiResponse(200, farmland, "farmland fetched successfully"))
})