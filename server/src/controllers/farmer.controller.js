import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { currentUserService, forgotPasswordService, loginFarmerUsingOtpService, loginFarmerUsingPasswordService, registerFarmerService } from '../services/farmer.service.js'



export const register = asyncHandler(async (req, res) => {
    const { fullname, password, phone, otp } = req.body

    const { farmer, token } = await registerFarmerService({ fullname, password, phone, otp })

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(201, farmer, "Farmer registered successfully"))
})


export const loginFarmerUsingOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body

    const { farmer, token } = await loginFarmerUsingOtpService({ phone, otp })

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(201, farmer, "Login successfully"))


})

export const loginFarmerUsingPassword = asyncHandler(async (req, res) => {
    const { phone, password } = req.body

    const { farmer, token } = await loginFarmerUsingPasswordService({ phone, password })

    res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(201, farmer, "Login successfully"))


})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { otp, phone, newPassword } = req.body

    const { farmer } = await forgotPasswordService({ otp, phone, newPassword })

    return res.status(200).json(new ApiResponse(200, farmer, "Password changed successfully"))
})

export const logoutFarmer = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token",
            {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            }
        )
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})

export const currentUser = asyncHandler(async (req, res) => {
    const { farmer } = await currentUserService({ req })

    return res.status(200).json(new ApiResponse(200, farmer, "user fetched!"))
})