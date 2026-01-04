import {Router} from 'express'
import { authLayer } from '../middleware/auth.middleware.js'
import { currentUser } from '../controllers/auth.controller.js'

export const authRouter = Router()

authRouter.get("/me", authLayer, currentUser)