import { Router } from "express"

import {
  createScheme,
  getAllSchemesAdmin,
  updateScheme,
  toggleScheme,
  getSchemesForFarmer,
  getAllSchemesForFarmer,
  getSingleScheme
} from "../controllers/governmentScheme.controller.js"

import { authLayer } from "../middleware/auth.middleware.js"
import { requireAdmin } from "../middleware/adminRole.middleware.js"
import { authorize } from "../middleware/role.middleware.js"

import { validate } from "../middleware/validate.middleware.js"

import {
  createSchemeSchema,
  updateSchemeSchema,
  getAllSchemesAdminSchema,
  toggleSchemeSchema,
  getSchemesForFarmerSchema,
  getAllSchemeFarmerSchema,
  getSingleSchemeValidator
} from "../validator/governmentScheme.validator.js"


export const schemeRouter = Router()



schemeRouter.post(
  "/admin/schemes",
  authLayer,
  requireAdmin,
  validate(createSchemeSchema),
  createScheme
)

schemeRouter.post(
  "/farmer/schemes",
  authLayer,
  validate(createSchemeSchema),
  createScheme
)



schemeRouter.get(
  "/admin/schemes",
  authLayer,
  requireAdmin,
  validate(getAllSchemesAdminSchema),
  getAllSchemesAdmin
)


schemeRouter.patch(
  "/admin/schemes/:id",
  authLayer,
  requireAdmin,
  validate(updateSchemeSchema),
  updateScheme
)

schemeRouter.patch(
  "/admin/schemes/:id/toggle",
  authLayer,
  requireAdmin,
  validate(toggleSchemeSchema),
  toggleScheme
)


schemeRouter.get(
  "/farmer/schemes",
  authLayer,
  authorize("farmer"),
  validate(getSchemesForFarmerSchema),
  getSchemesForFarmer
)

schemeRouter.get(
  "/farmer/schemes/all",
  authLayer,
  authorize("farmer"),
  validate(getAllSchemeFarmerSchema),
  getAllSchemesForFarmer
)


schemeRouter.get(
  "/farmer/schemes/:schemeId",
  authLayer,
  authorize("farmer"),
  validate(getSingleSchemeValidator),
  getSingleScheme
)

