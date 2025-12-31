import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { adminLoginSchema, blockFarmerSchema, bootstrapSuperAdminSchema, getAllFarmerSchema, getAllListingSchema, getAllQuerySchema, moderateListingSchema, registerAdminSchema, unBlockFarmerSchema, updateQuerySchema } from "../validator/admin.validator.js"
import { blockFarmer, bootstrapSuperAdmin, bootStrapSuperAdminLogin, bootstrapSuperAdminLogout, changeQueryPriority, changeQueryStatus, createAdminInvite, getAllFarmer, getAllPreHarvestedListing, getAllProductListing, getAllQuery, loginAdmin, logoutAdmin, moderatePreHarvestListing, moderateProductListing, registerAdminWithInviteToken, replyToQuery, unBlockFarmer } from "../controllers/admin.controller.js"
import { requireAdmin, requireSuperAdmin } from "../middleware/adminRole.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"

export const adminRoutes = Router()


//invite admin route
adminRoutes.post('/super-admin/invite', authLayer, requireSuperAdmin, createAdminInvite)
//super Admin routes 
adminRoutes.post('/super-admin/register', validate(bootstrapSuperAdminSchema), bootstrapSuperAdmin)
adminRoutes.post('/super-admin/login', validate(adminLoginSchema), bootStrapSuperAdminLogin)
adminRoutes.post('/super-admin/logout', authLayer, requireSuperAdmin, bootstrapSuperAdminLogout)

//register Admin via inviteToken

adminRoutes.post("/register", validate(registerAdminSchema), registerAdminWithInviteToken)
adminRoutes.post("/login", validate(adminLoginSchema), loginAdmin)
adminRoutes.post("/logout", authLayer, requireAdmin, logoutAdmin)

//ADMIN MODERATION ROUTES
adminRoutes.get("/listings/pre-harvested", authLayer, requireAdmin, validate(getAllListingSchema), getAllPreHarvestedListing)

adminRoutes.get("/listings/harvested", authLayer, requireAdmin, validate(getAllListingSchema), getAllProductListing)

adminRoutes.patch("/listings/pre-harvested/:listingId/moderate", authLayer, requireAdmin, validate(moderateListingSchema), moderatePreHarvestListing)

adminRoutes.patch("/listings/harvested/:listingId/moderate", authLayer, requireAdmin, validate(moderateListingSchema), moderateProductListing)

adminRoutes.get("/queries", authLayer, requireAdmin, validate(getAllQuerySchema), getAllQuery)

adminRoutes.patch("/queries/:queryId/status", authLayer, requireAdmin, validate(updateQuerySchema), changeQueryStatus)

adminRoutes.patch("/queries/:queryId/priority", authLayer, requireAdmin, validate(updateQuerySchema), changeQueryPriority)

adminRoutes.patch("/queries/:queryId/reply", authLayer, requireAdmin, validate(updateQuerySchema), replyToQuery)

adminRoutes.get("/farmer", authLayer, requireAdmin, validate(getAllFarmerSchema), getAllFarmer)

adminRoutes.patch("/farmer/:farmerId/block", authLayer, requireAdmin, validate(blockFarmerSchema), blockFarmer)

adminRoutes.patch("/farmer/:farmerId/unblock", authLayer, requireAdmin, validate(unBlockFarmerSchema), unBlockFarmer)