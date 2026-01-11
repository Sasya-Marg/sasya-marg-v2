import { Router } from "express"

import {
    createProduct,
    getMyProducts,
    updateProduct,
    toggleProductStatus,
    getProductById,
    updatePrice,
    updateStock
} from "../controllers/product.controller.js"

import {
    createProductSchema,
    updateProductSchema,
    myProductListingQuerySchema,
    toggleProductSchema,
    getProductByIdSchema,
    updatePriceSchema,
    updateStockSchema
} from "../validator/product.validator.js"

import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/role.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

export const productRouter = Router()

productRouter.post(
    "/",
    authLayer,
    authorize("farmer"),
    upload.array("images", 5),
    validate(createProductSchema),
    createProduct
)

productRouter.get(
    "/me",
    authLayer,
    authorize("farmer"),
    validate(myProductListingQuerySchema),
    getMyProducts
)

productRouter.get(
    "/:listingId",
    authLayer,
    authorize("farmer"),
    validate(getProductByIdSchema),
    getProductById
)

productRouter.patch(
    "/:listingId",
    authLayer,
    authorize("farmer"),
    validate(updateProductSchema),
    updateProduct
)

productRouter.patch(
    "/update-price/:listingId",
    authLayer,
    authorize("farmer"),
    validate(updatePriceSchema),
    updatePrice
)

productRouter.patch(
    "/update-stock/:listingId",
    authLayer,
    authorize("farmer"),
    validate(updateStockSchema),
    updateStock
)

productRouter.patch(
    "/:listingId/toggle",
    authLayer,
    authorize("farmer"),
    validate(toggleProductSchema),
    toggleProductStatus
)


