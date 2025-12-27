import { getPredictedCropHistoryService, getSinglePredictionService } from '../services/predictHistory.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'


export const getPredictedHistory = asyncHandler(async (req, res) => {

    const farmerId = req.user._id
    const farmLandId = req.query.farmLandId || null

    const history = await getPredictedCropHistoryService({ farmerId, farmLandId })

    return res.status(200).json(new ApiResponse(200, history, "Crop History fetched Successfully"))
})

export const getSinglePredictHistory = asyncHandler(async (req, res) => {
    const farmerId = req.user._id
    const predictionId = req.params.predictionId

    const history = await getSinglePredictionService({ predictionId, farmerId })
    return res.status(200).json(new ApiResponse(200, history, "Crop History fetched Successfully"))
})