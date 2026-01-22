import { api } from "@/lib/axios"


export const buyerLoginWithPassword = async ({ identifier, password }) => {
    const { data } = await api.post("/buyer/auth/login/password", { identifier, password })
    return data
}

export const buyerLoginWithOtp = async ({ phone, otp }) => {
    const { data } = await api.post("/buyer/auth/login/otp", { phone, otp })
    return data
}

export const buyerSignup = async (payload) => {
    const { data } = await api.post("/buyer/auth/register", payload)
    return data
}

export const forgotBuyerPassword = async (payload) => {
    const { data } = await api.put("/buyer/auth/forgot-password", payload)
    return data
}