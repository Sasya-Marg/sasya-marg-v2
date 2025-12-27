import { Router } from "express"

import {
    registerBuyer,
    loginBuyerWithPassword,
    loginBuyerWithOtp,
    forgotPassword,
    changePassword,
    currentUser,
    updateBuyerAddress
} from "../controllers/buyer.controller.js"

import {
    registerBuyerSchema,
    loginBuyerWithPasswordSchema,
    loginBuyerWithOtpSchema,
    forgotBuyerPasswordSchema,
    changeBuyerPasswordSchema,
    updateBuyerAddressSchema
} from "../validator/buyer.validator.js"

import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/role.middleware.js"

export const buyerRouter = Router()

/* =========================
   PUBLIC ROUTES
========================= */

// Register buyer (OTP based)
buyerRouter.post(
    "/register",
    validate(registerBuyerSchema),
    registerBuyer
)

// Login using email/phone + password
buyerRouter.post(
    "/login/password",
    validate(loginBuyerWithPasswordSchema),
    loginBuyerWithPassword
)

// Login using OTP
buyerRouter.post(
    "/login/otp",
    validate(loginBuyerWithOtpSchema),
    loginBuyerWithOtp
)

// Forgot password (OTP based)
buyerRouter.post(
    "/forgot-password",
    validate(forgotBuyerPasswordSchema),
    forgotPassword
)

/* =========================
   PROTECTED BUYER ROUTES
========================= */

buyerRouter.use(authLayer, authorize("buyer"))

// Get current buyer profile
buyerRouter.get("/me", currentUser)

// Change password (logged in)
buyerRouter.post(
    "/change-password",
    validate(changeBuyerPasswordSchema),
    changePassword
)

// Add / Update single address
buyerRouter.patch(
    "/address",
    validate(updateBuyerAddressSchema),
    updateBuyerAddress
)

