import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { registerFarmerSchema, loginFarmerUsingOtpSchema, loginFarmerWithPasswordSchema, forgotPasswordSchema } from '../validator/farmer.validator.js'
import { register, loginFarmerUsingOtp, loginFarmerUsingPassword, forgotPassword, logoutFarmer, currentUser } from '../controllers/farmer.controller.js'

export const farmerRoutes = Router()

farmerRoutes.post("/register", validate(registerFarmerSchema), register)

farmerRoutes.post("/login/otp", validate(loginFarmerUsingOtpSchema), loginFarmerUsingOtp)

farmerRoutes.post("/login/password", validate(loginFarmerWithPasswordSchema), loginFarmerUsingPassword)

farmerRoutes.post("/forgot-password", validate(forgotPasswordSchema), authLayer, forgotPassword)

farmerRoutes.post("/logout", authLayer, logoutFarmer)

farmerRoutes.post("/me", authLayer, currentUser)