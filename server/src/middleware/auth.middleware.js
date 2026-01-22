import { ApiError } from '../utils/apiError.js'
import jwt from 'jsonwebtoken'


export const authLayer = (req, res, next) => {
    try {
        let token;

        if (req.cookies?.token) {
            token = req.cookies.token
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new ApiError(401, "Authentication required")
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            _id: decode._id,
            role: decode.role,
            isActive: decode.isActive
        }

        next()
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token")
    }
}