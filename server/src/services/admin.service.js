import { Admin } from "../models/admin.model.js"
import { ApiError } from "../utils/apiError.js"
import { Farmer } from '../models/farmer.model.js'
import { Buyer } from '../models/buyer.model.js'
import { generateToken } from "../utils/generateToken.js"
import crypto from 'crypto'
import { AdminInvite } from "../models/adminInvite.model.js"


//InviteToken service

export const createAdminInviteService = async ({ adminId }) => {
    const token = crypto.randomBytes(32).toString('hex')

    const invite = await AdminInvite.create({
        token,
        invitedBy: adminId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)  //24 h
    })

    return {
        token: invite.token,
        expiresAt: invite.expiresAt
    }
}

//Invite token service end here


export const bootStrapSuperAdminService = async ({
    fullname,
    email,
    phone,
    password,
    secret
}) => {
    if (secret !== process.env.SUPER_ADMIN_SECRET) {
        throw new ApiError(403, "Invalid Bootstrap Secret")
    }

    const adminCount = await Admin.countDocuments()

    if (adminCount > 0) {
        throw new ApiError(409, "Super admin is already exist")
    }

    const [farmerExist, buyerExist] = await Promise.all([
        Farmer.exists({
            $or: [{ phone }, { email }]
        }),
        Buyer.exists({
            $or: [{ phone }, { email }]
        }),

    ])

    if (farmerExist || buyerExist) {
        throw new ApiError(409, "User already exsit with email or phone")
    }

    const superAdmin = await Admin.create({
        fullname,
        email,
        phone,
        password,
        role: "super_admin",
        isActive: true
    })


    return {
        fullname: superAdmin.fullname,
        email: superAdmin.email,
        phone: superAdmin.phone,
        role: superAdmin.role,
        _id: superAdmin._id,
        createdAt: superAdmin.createdAt

    }
}

export const loginSuperAdminService = async ({ identifier, password }) => {
    const filter = {}

    if (identifier.includes('@')) {
        filter.email = identifier
    } else {
        filter.phone = identifier
    }

    const superAdmin = await Admin.findOne(filter).select("+password")

    if (!superAdmin) {
        throw new ApiError(403, "Invalid Credentials")
    }

    if (superAdmin.role !== "super_admin") {
        throw new ApiError(403, "Access denied ")
    }

    const isPaswordValid = await superAdmin.comparePassword(password)


    if (!isPaswordValid) {
        throw new ApiError(403, "Invalid credentials")
    }

    if (superAdmin.isActive === false) {
        throw new ApiError(403, "Admin Account is disabled")
    }

    const token = generateToken({ _id: superAdmin._id, role: "super_admin" })

    return { superAdmin, token }

}

//register admn service with token


export const registerAdminWithInviteTokenService = async ({ inviteToken, payload }) => {
    const invite = await AdminInvite.findOne({
        token: inviteToken,
        used: false,
        expiresAt: { $gt: new Date() }
    })

    if (!invite) {
        throw new ApiError(403, "Invalid or expired invite token")
    }

    const [superAdminExist, farmerExist, buyerExist] = await Promise.all([
        Admin.exists({
            $or: [{ phone: payload.phone }, { email: payload.email }]
        }),
        Farmer.exists({
            $or: [{ phone: payload.phone }, { email: payload.email }]
        }),
        Buyer.exists({
            $or: [{ phone: payload.phone }, { email: payload.email }]
        })
    ])

    if (superAdminExist || farmerExist || buyerExist) {
        throw new ApiError(403, "Number or email is already in use")
    }

    const admin = await Admin.create({
        ...payload,
        role: invite.role
    })

    invite.used = true
    await invite.save()

    return admin
}


//core admin services
export const loginAdminService = async ({ identifier, password }) => {
    const filter = identifier.includes("@") ? { email: identifier } : { phone: identifier }

    const admin = await Admin.findOne(filter).select("+password")

    if (!admin) {
        throw new ApiError(404, "Admin not found")
    }

    const verifyPassword = await admin.comparePassword(password)

    if (!verifyPassword) throw new ApiError(403, "Invalid credentials")

    if (!admin.isActive) throw new ApiError(403, "Admin account is not active")

    const token = generateToken({ _id: admin._id, role: admin.role })

    return { admin, token }

}