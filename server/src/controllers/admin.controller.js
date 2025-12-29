import { bootStrapSuperAdminService, loginSuperAdminService } from '../services/admin.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'

export const bootstrapSuperAdmin = asyncHandler(async (req, res) => {
    const superAdmin = await bootStrapSuperAdminService(req.body)

    return res.status(201).json(new ApiResponse(201, superAdmin, "Super Admin created successfully"))
})


export const bootStrapSuperAdminLogin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    const { superAdmin, token } = await loginSuperAdminService({ identifier, password })

    return res
        .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 100 * 60 * 60 * 24 * 7 })
        .status(200)
        .json(new ApiResponse(200, superAdmin, "Super Admin loggedin successfully"))
})

export const bootstrapSuperAdminLogout = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })
        .status(200)
        .json(new ApiResponse(200, null, "Super Admin logged out"))
})