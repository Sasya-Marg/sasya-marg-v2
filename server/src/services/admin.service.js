import { Admin } from "../models/admin.model.js"
import { ApiError } from "../utils/apiError.js"
import { Farmer } from '../models/farmer.model.js'
import { Buyer } from '../models/buyer.model.js'
import { generateToken } from "../utils/generateToken.js"


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