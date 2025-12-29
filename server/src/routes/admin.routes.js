import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { adminLoginSchema, bootstrapSuperAdminSchema } from "../validator/admin.validator.js"
import { bootstrapSuperAdmin, bootStrapSuperAdminLogin, bootstrapSuperAdminLogout } from "../controllers/admin.controller.js"

export const adminRoutes = Router()


//super Admin routes 
adminRoutes.post('/super-admin/register', validate(bootstrapSuperAdminSchema), bootstrapSuperAdmin)
adminRoutes.post('/super-admin/login', validate(adminLoginSchema), bootStrapSuperAdminLogin)
adminRoutes.post('/super-admin/logout', bootstrapSuperAdminLogout)