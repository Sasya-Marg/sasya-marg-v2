import { ApiError } from '../utils/apiError.js'
import { PredictHistory } from "../models/predictHistory.model.js"

export const getPredictedCropHistoryService = async ({ farmerId, farmLandId }) => {


    const filter = { farmer: farmerId }

    if (farmLandId) {
        filter.farmLand = farmLandId
    }

    const history = await PredictHistory.find(filter).sort({ createdAt: -1 }).lean()

    if (!history || history.length === 0) throw new ApiError(404, "No Hisory found")

    return history
}

export const getSinglePredictionService = async ({
    farmerId,
    predictionId
}) => {
    const prediction = await PredictHistory.findOne({
        _id: predictionId,
        farmer: farmerId
    }).lean()

    if (!prediction) {
        throw new ApiError(404, "Prediction not found")
    }

    return prediction
}