import jwt from 'jsonwebtoken'

export const generateToken = ({ _id, role, isActive }) => {
    return jwt.sign(
        { _id, role, isActive },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIERY || "7d" }
    )
}