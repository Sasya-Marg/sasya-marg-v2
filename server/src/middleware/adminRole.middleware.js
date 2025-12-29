import { ApiError } from "../utils/apiError.js"

export const requireAdmin = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "super_admin") {
        throw new ApiError(403, "Admin Access required")
    }
    next()
}

export const requireSuperAdmin = (req, res, next) => {
    if (req.user.role !== "super_admin") {
        throw new ApiError(403, "Super Admin Access required")
    }
}