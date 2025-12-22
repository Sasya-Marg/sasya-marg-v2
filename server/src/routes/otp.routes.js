import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { sendOtpSchema } from '../validator/farmer.validator.js'
import { sendOtp } from '../controllers/otp.controller.js'

export const otpRoutes = Router()


otpRoutes.post("/send", validate(sendOtpSchema), sendOtp)