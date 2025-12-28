import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from "../utils/apiResponse.js";
import { createPreHarvestListingService, getPreHarvestListingService, getMyPreHarvestListingService } from '../services/preHarvestListing.service.js';


export const createPreHarvestList = asyncHandler(async (req, res) => {
    const { payload } = req.body
    const farmerId = req.user._id
    const files = req.files

    const listing = await createPreHarvestListingService({ farmerId, payload, files })

    return res.status(201).json(new ApiResponse(201, listing, "Product listed successfully"))
})


export const getPreHarvestedListings = asyncHandler(async (req, res) => {
    const { listings, pagination } = await getPreHarvestListingService(req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})

export const getMyPreHarvestedListings = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const { listings, pagination } = await getMyPreHarvestListingService(farmerId, req.query)

    return res.status(200).json(new ApiResponse(200, { listings, pagination }, "Listing Feteched Successfully"))
})