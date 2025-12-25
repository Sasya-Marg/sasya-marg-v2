import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { recommendCropsService } from '../services/cropRecommandation.service.js'

export const getSuggestion = asyncHandler(async (req, res) => {
    const { farmLandId } = req.params
    const farmerId = req.user._id

    const { season, weather, recommendations } = await recommendCropsService({ farmerId, farmLandId })


    return res.status(200).json(new ApiResponse(200, { season, weather, recommendations }, 'Crop suggestion is successfull'))

})