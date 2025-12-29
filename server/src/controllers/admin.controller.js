import { bootStrapSuperAdminService, createAdminInviteService, loginAdminService, loginSuperAdminService, registerAdminWithInviteTokenService } from '../services/admin.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'


//Admin Invite Token Controller
export const createAdminInvite = asyncHandler(async (req, res) => {
    const adminId = req.user._id

    const invite = await createAdminInviteService({ adminId })

    return res.status(201).json(new ApiResponse(201, invite, "Admin invite token generated"))
})
//

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


//register admin with invite token

export const registerAdminWithInviteToken = asyncHandler(async (req, res) => {
    const { inviteToken } = req.query

    const admin = await registerAdminWithInviteTokenService({ inviteToken, payload: req.body })

    return res.status(200).json(new ApiResponse(200, admin, "Admin created successfully"))

})

export const loginAdmin = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body

    const { token, admin } = await loginAdminService({ identifier, password })

    return res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: "strict"
        })
        .status(200)
        .json(new ApiResponse(200, admin, "Admin logged In successfully"))
})

export const logoutAdmin = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV
        })
        .status(200)
        .json(new ApiResponse(200, null, "Logout Successfull"))
})