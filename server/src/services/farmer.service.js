import { Farmer } from '../models/farmer.model.js'
import { ApiError } from '../utils/apiError.js'
import { verifyOtpService } from './otp.service.js'
import { generateToken } from '../utils/generateToken.js'
import { verifyPassword } from '../utils/verifyPassword.js'

export const registerFarmerService = async ({ fullname, phone, otp, password }) => {
    const existing = await Farmer.findOne({ phone })
    if (existing) throw new ApiError(409, "Farmer already registered")

    await verifyOtpService({ phone, otp, purpose: "register" })

    const farmer = await Farmer.create({
        fullname,
        phone,
        otp,
        password,
        isVarified: true,
    })

    const token = generateToken({ _id: farmer._id, role: "farmer" })

    return { farmer, token }
}


export const loginFarmerUsingOtpService = async ({ phone, otp }) => {
    const farmer = await Farmer.findOne({ phone })

    if (!farmer) throw new ApiError(404, "Farmer is not registered yet")

    await verifyOtpService({ otp, purpose: "login", phone })

    const token = generateToken({ _id: farmer._id, role: "farmer" })

    return { farmer, token }


}


export const loginFarmerUsingPasswordService = async ({ phone, password }) => {
    const farmer = await Farmer.findOne({ phone }).select("+password")

    if (!farmer) throw new ApiError(404, "Farmer is not registered yet")

    const isVarified = await verifyPassword(password, farmer.password)

    if (!isVarified) throw new ApiError(401, "Invalid credentials")

    const token = generateToken({ _id: farmer._id, role: "farmer" })

    delete farmer.password

    return { farmer, token }
}


export const forgotPasswordService = async ({ phone, otp, newPassword }) => {
    const farmer = await Farmer.findOne({ phone }).select("+password")

    await verifyOtpService({ otp, purpose: "forgot_password", phone })

    farmer.password = newPassword
    await farmer.save()
    delete farmer?.password
    return { farmer }
}


export const currentUserService = async ({ req }) => {
    const farmer = await Farmer.findOne({ _id: req.user._id })
    return { farmer }
}
