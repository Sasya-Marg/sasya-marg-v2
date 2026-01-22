import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { registerFarmerSchema, loginFarmerUsingOtpSchema, loginFarmerWithPasswordSchema, forgotPasswordSchema, changePasswordSchema, changeFarmerDataSchema } from '../validator/farmer.validator.js'
import { register, loginFarmerUsingOtp, loginFarmerUsingPassword, forgotPassword, logoutFarmer, currentUser, changePassword, toggleIsContactVisible, changeFarmerData, farmerDashboard } from '../controllers/farmer.controller.js'
import { loginFarmerLimiter, changePasswordLimiter, changeDataLimiter } from '../middleware/rate limiter/authRateLimiter.js'
import { activeFarmer } from '../middleware/aciveFarmer.middleware.js'

export const farmerRoutes = Router()

farmerRoutes.post("/auth/register", validate(registerFarmerSchema), register)

farmerRoutes.post("/auth/login/otp", loginFarmerLimiter, validate(loginFarmerUsingOtpSchema), loginFarmerUsingOtp)

farmerRoutes.post("/auth/login/password", loginFarmerLimiter, validate(loginFarmerWithPasswordSchema), loginFarmerUsingPassword)

farmerRoutes.put("/auth/forgot-password", loginFarmerLimiter, validate(forgotPasswordSchema), forgotPassword)

farmerRoutes.post("/logout", authLayer, logoutFarmer)

farmerRoutes.get("/me", authLayer, currentUser)

farmerRoutes.put("/change/password", changePasswordLimiter, authLayer, activeFarmer, validate(changePasswordSchema), changePassword)

farmerRoutes.put("/change/contact-visibility", changePasswordLimiter, authLayer, activeFarmer, toggleIsContactVisible)

farmerRoutes.put("/change/farmer-data", authLayer, changeDataLimiter, activeFarmer, validate(changeFarmerDataSchema), changeFarmerData)

farmerRoutes.get("/dashboard", authLayer, activeFarmer, farmerDashboard)