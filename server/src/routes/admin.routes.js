import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { adminLoginSchema, bootstrapSuperAdminSchema, registerAdminSchema } from "../validator/admin.validator.js"
import { bootstrapSuperAdmin, bootStrapSuperAdminLogin, bootstrapSuperAdminLogout, createAdminInvite, loginAdmin, logoutAdmin, registerAdminWithInviteToken } from "../controllers/admin.controller.js"
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