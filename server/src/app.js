import express, { urlencoded, json } from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { ApiError } from './utils/apiError.js';
import { ApiResponse } from './utils/apiResponse.js';
import { errorHandler } from './middleware/error.middleware.js';
import { farmerRoutes } from './routes/farmer.routes.js';
import { otpRoutes } from './routes/otp.routes.js';
import { farmLandRoutes } from './routes/farmLand.routes.js';
import { weatherRoutes } from './routes/weather.routes.js';
import { previousCropRoutes } from './routes/previousCrop.routes.js';
import { suggestionRoutes } from './routes/cropSuggestion.routes.js';
import { historyRoutes } from './routes/predictHistory.routes.js'
import { buyerRouter } from './routes/buyer.routes.js';



export const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}))

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cookieParser())


app.get("/error-test", async (req, res) => {
    throw new ApiError(404, "New error");
});

app.post("/response-test", async (req, res) => {
    res.status(200).json(new ApiResponse(200, null));
});


app.use('/api/v2/auth/farmer', farmerRoutes)
app.use('/api/v2/otp', otpRoutes)
app.use('/api/v2/farmland', farmLandRoutes)
app.use('/api/v2/weather', weatherRoutes)
app.use('/api/v2/previous-crop', previousCropRoutes)
app.use('/api/v2/crop-suggestion', suggestionRoutes)
app.use('/api/v2/suggestion/history', historyRoutes)
app.use('/api/v2/auth/buyer', buyerRouter)








app.use(errorHandler)