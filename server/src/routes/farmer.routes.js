import { Router } from 'express'
import { validate } from '../middleware/validate.middleware.js'
import { authLayer } from '../middleware/auth.middleware.js'
import { registerFarmerSchema, loginFarmerUsingOtpSchema, loginFarmerWithPasswordSchema, forgotPasswordSchema, changePasswordSchema, changeFarmerDataSchema } from '../validator/farmer.validator.js'
import { register, loginFarmerUsingOtp, loginFarmerUsingPassword, forgotPassword, logoutFarmer, currentUser, changePassword, toggleIsContactVisible, changeFarmerData } from '../controllers/farmer.controller.js'

export const farmerRoutes = Router()

farmerRoutes.post("/register", validate(registerFarmerSchema), register)

farmerRoutes.post("/login/otp", validate(loginFarmerUsingOtpSchema), loginFarmerUsingOtp)

farmerRoutes.post("/login/password", validate(loginFarmerWithPasswordSchema), loginFarmerUsingPassword)

farmerRoutes.put("/forgot-password", authLayer, validate(forgotPasswordSchema), forgotPassword)

farmerRoutes.post("/logout", authLayer, logoutFarmer)

farmerRoutes.post("/me", authLayer, currentUser)

farmerRoutes.put("/change/password", authLayer, validate(changePasswordSchema), changePassword)

farmerRoutes.put("/change/contact-visibility", authLayer, toggleIsContactVisible)

farmerRoutes.put("/change/farmer-data", authLayer, validate(changeFarmerDataSchema), authLayer, changeFarmerData)