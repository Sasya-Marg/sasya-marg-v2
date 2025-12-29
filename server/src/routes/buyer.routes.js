import { Router } from "express"

import {
    registerBuyer,
    loginBuyerWithPassword,
    loginBuyerWithOtp,
    forgotPassword,
    changePassword,
    currentUser,
    updateBuyerAddress,
    logoutBuyer
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



buyerRouter.post(
    "/register",
    validate(registerBuyerSchema),
    registerBuyer
)


buyerRouter.post(
    "/login/password",
    validate(loginBuyerWithPasswordSchema),
    loginBuyerWithPassword
)


buyerRouter.post(
    "/login/otp",
    validate(loginBuyerWithOtpSchema),
    loginBuyerWithOtp
)


buyerRouter.post(
    "/forgot-password",
    validate(forgotBuyerPasswordSchema),
    forgotPassword
)



buyerRouter.use(authLayer, authorize("buyer"))


buyerRouter.get("/me", currentUser)


buyerRouter.post(
    "/change-password",
    validate(changeBuyerPasswordSchema),
    changePassword
)


buyerRouter.patch(
    "/address",
    validate(updateBuyerAddressSchema),
    updateBuyerAddress
)

buyerRouter.post("/logout", logoutBuyer)