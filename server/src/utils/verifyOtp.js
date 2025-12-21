import bcrypt from "bcryptjs"

export const verifyOtp = async (otp, dbOtp) => {
    return await bcrypt.compare(otp, dbOtp)
}