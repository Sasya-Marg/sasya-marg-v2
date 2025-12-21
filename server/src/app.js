import express, { urlencoded, json } from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { ApiError } from './utils/apiError.js';
import { ApiResponse } from './utils/apiResponse.js';
import { errorHandler } from './middleware/error.middleware.js';




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

app.get("/response-test", async (req, res) => {
    res.status(200).json(new ApiResponse(200, null));
});








app.use(errorHandler)