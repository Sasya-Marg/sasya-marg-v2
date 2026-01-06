import { createLimiter } from "./rateLimiter.middleware.js"

export const sendOtpLimit = createLimiter({
    windowMs: 1000 * 60 * 5, //5 minutes
    max: 3,
    message: "Too many OTP requests. Please wait before retrying"
})

export const changePasswordLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many attempts, Try later"
})

export const loginFarmerLimiter = createLimiter({
    windowMs: 1000 * 60 * 5,
    max: 10,
    message: "Too many login attempts, Try later"
})

export const changeDataLimiter = createLimiter({
    windowMs: 1000 * 60 * 10,
    max: 10,
    message: "To many attempts try again later"
})