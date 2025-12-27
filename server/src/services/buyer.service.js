import { Buyer } from "../models/buyer.model.js"
import { ApiError } from "../utils/apiError.js"
import { verifyOtpService } from "./otp.service.js"
import { generateToken } from '../utils/generateToken.js'
import { verifyPassword } from '../utils/verifyPassword.js'
import { Farmer } from "../models/farmer.model.js"

export const registerBuyerService = async ({ fullname, phone, otp, password, email }) => {
    const existing = await Buyer.findOne({ phone })

    const farmerExists = await Farmer.findOne({
        $or: [
            { phone },
            ...(email ? [{ email: email.toLowerCase() }] : [])
        ]
    })

    if (farmerExists) {
        throw new ApiError(
            403,
            "This number is already registered as a Farmer"
        )
    }

    if (existing) throw new ApiError(409, "Buyer already registered")

    await verifyOtpService({ phone, otp, purpose: "register" })

    const buyer = await Buyer.create({
        fullname,
        phone,
        password,
        email: email || ""
    })

    const token = generateToken({ _id: buyer._id, role: "buyer" })

    return { buyer, token }
}

export const loginBuyerUsingOtpService = async ({ phone, otp }) => {
    const buyer = await Buyer.findOne({ phone })

    if (!buyer) throw new ApiError(404, "Buyer is not registered yet")

    if (buyer.isBlocked) {
        throw new ApiError(403, "Buyer account is blocked")
    }

    await verifyOtpService({ otp, purpose: "login", phone })

    const token = generateToken({ _id: buyer._id, role: "buyer" })

    return { buyer, token }


}

export const loginBuyerUsingPasswordService = async ({ identifier, password }) => {

    const isEmail = identifier.includes("@")

    const query = isEmail ?
        {
            email: identifier.toLowerCase(),
        }
        :
        {
            phone: identifier
        }

    const buyer = await Buyer.findOne(query).select("+password")

    if (!buyer) throw new ApiError(404, "Buyer is not registered yet")

    if (buyer.isBlocked) throw new ApiError(403, "Buyer Account is blocked")

    const isVarified = await buyer.comparePassword(password)

    if (!isVarified) throw new ApiError(401, "Invalid credentials")

    const token = generateToken({ _id: buyer._id, role: "buyer" })

    const buyerObj = buyer.toObject()
    delete buyerObj.password
    return { buyer: buyerObj, token }
}

export const forgotBuyerPasswordService = async ({ phone, otp, newPassword }) => {
    const buyer = await Buyer.findOne({ phone }).select("+password")

    if (!buyer) {
        throw new ApiError(404, "Buyer not found")
    }

    await verifyOtpService({ otp, purpose: "forgot_password", phone })

    buyer.password = newPassword
    await buyer.save()

    const buyerObj = buyer.toObject()
    delete buyerObj.password
    return { buyer: buyerObj }
}

export const changeBuyerPasswordService = async ({ oldPassword, newPassword, _id }) => {
    const buyer = await Buyer.findById(_id).select("+password")

    if (!buyer) {
        throw new ApiError(404, "Buyer not found")
    }

    if (buyer.isBlocked) {
        throw new ApiError(403, "Buyer Account is blocked")
    }

    const validOldPassword = await buyer.comparePassword(oldPassword)

    if (!validOldPassword) throw new ApiError(401, "Old password is Incorrect")

    const isNewPasswordIsSame = await verifyPassword(newPassword, buyer.password)
    if (isNewPasswordIsSame) {
        throw new ApiError(
            400,
            "New password must be different from old password"
        )
    }

    buyer.password = newPassword
    await buyer.save()

    return buyer

}

export const currentUserService = async ({ buyerId }) => {
    return await Buyer.findById(buyerId)
}

export const updateBuyerAddressService = async ({ buyerId, address }) => {
    const allowedAddress = {
        label: address.label,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode
    }

    const buyer = await Buyer.findByIdAndUpdate(
        buyerId,
        {
            $set: { address: allowedAddress }
        },
        { new: true }
    )

    if (!buyer) {
        throw new ApiError(404, "Buyer not found")
    }

    return buyer

}
