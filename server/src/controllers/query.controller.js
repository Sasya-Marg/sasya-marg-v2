import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { createQueryService } from '../services/query.service.js'



export const createQuery = asyncHandler(async (req, res) => {
    const farmerId = req.user._id

    const query = await createQueryService({ farmerId, payload: req.body })

    return res.status(201).json(new ApiResponse(201, query, "Query created successfully"))
})