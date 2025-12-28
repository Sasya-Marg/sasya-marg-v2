import { ApiError } from "../utils/apiError.js"

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("Request in role middleware")
        if (!allowedRoles.includes(req.user.role)) {
            console.log("Allowed roles ::", allowedRoles)
            console.log("USER IN ROLE MIDDLEWARE", req.user)
            throw new ApiError(403, "Access denied")
        }
        next()
    }
}