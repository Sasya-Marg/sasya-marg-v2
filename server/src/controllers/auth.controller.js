import { currentUserService } from "../services/auth.service.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const currentUser = asyncHandler(async (req, res) => {
    const {role , user} = await currentUserService({req})

    return res.status(200).json(new ApiResponse(200, {role , user}, "User Fetched successfully"))
})