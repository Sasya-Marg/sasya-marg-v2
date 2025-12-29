import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { createQuerySchema } from "../validator/query.validator.js"
import { authorize } from "../middleware/role.middleware.js"
import { createQuery } from "../controllers/query.controller.js"

export const queryRoutes = Router()

queryRoutes.post("/", authLayer, authorize("farmer"), validate(createQuerySchema), createQuery)