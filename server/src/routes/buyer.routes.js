import { Router } from "express"

import {
    registerBuyer,
    loginBuyerWithPassword,
    loginBuyerWithOtp,
    forgotPassword,
    changePassword,
    currentUser,
    updateBuyerAddress,
    logoutBuyer,
    getPreHarvestedListings,
    getProductListings,
    buyerDashbord
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
import { getPreHarvestListingQuerySchema } from "../validator/preHarvestListing.validator.js"
import { getProductListingSchema } from "../validator/product.validator.js"

export const buyerRouter = Router()



buyerRouter.post(
    "/auth/register",
    validate(registerBuyerSchema),
    registerBuyer
)


buyerRouter.post(
    "/auth/login/password",
    validate(loginBuyerWithPasswordSchema),
    loginBuyerWithPassword
)


buyerRouter.post(
    "/auth/login/otp",
    validate(loginBuyerWithOtpSchema),
    loginBuyerWithOtp
)


buyerRouter.post(
    "/auth/forgot-password",
    validate(forgotBuyerPasswordSchema),
    forgotPassword
)



buyerRouter.use(authLayer, authorize("buyer"))


buyerRouter.get("/me", currentUser)


buyerRouter.post(
    "/auth/change-password",
    validate(changeBuyerPasswordSchema),
    changePassword
)


buyerRouter.patch(
    "/address",
    validate(updateBuyerAddressSchema),
    updateBuyerAddress
)

buyerRouter.post("/logout", logoutBuyer)
buyerRouter.get("/dashboard", buyerDashbord)


buyerRouter.get("/listing/pre-harvest", validate(getPreHarvestListingQuerySchema), getPreHarvestedListings)
buyerRouter.get("/listing", validate(getProductListingSchema), getProductListings)