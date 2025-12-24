import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { sendOtpSchema } from '../validator/farmer.validator.js'
import { sendOtp } from '../controllers/otp.controller.js'
import { sendOtpLimit } from '../middleware/rate limiter/authRateLimiter.js'

export const otpRoutes = Router()


otpRoutes.post("/send",sendOtpLimit, validate(sendOtpSchema), sendOtp)