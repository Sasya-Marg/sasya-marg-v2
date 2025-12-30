import { Router } from "express"
import { validate } from "../middleware/validate.middleware.js"
import { authLayer } from "../middleware/auth.middleware.js"
import { closeQuerySchema, createQuerySchema, updateQuerySchema, viewMyQuerySchema, viewSingleQuerySchema } from "../validator/query.validator.js"
import { authorize } from "../middleware/role.middleware.js"
import { closeQuery, createQuery, updateQuery, viewMyQuery, viewSingleQuery } from "../controllers/query.controller.js"
import { sendQueryLimit } from "../middleware/rate limiter/queryRateLimiter.js"

export const queryRoutes = Router()

queryRoutes.post("/", sendQueryLimit, authLayer, authorize("farmer"), validate(createQuerySchema), createQuery)
queryRoutes.get("/my", authLayer, authorize("farmer"), validate(viewMyQuerySchema), viewMyQuery)
queryRoutes.get("/:queryId", authLayer, authorize("farmer"), validate(viewSingleQuerySchema), viewSingleQuery)
queryRoutes.patch("/:queryId", authLayer, authorize("farmer"), validate(updateQuerySchema), updateQuery)
queryRoutes.patch("/:queryId/close", authLayer, authorize("farmer"), validate(closeQuerySchema), closeQuery)