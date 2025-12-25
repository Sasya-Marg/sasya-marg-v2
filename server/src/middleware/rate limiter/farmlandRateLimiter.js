import { createLimiter } from "./rateLimiter.middleware.js";

export const FarmLandLimiter = createLimiter({
    windowMs: 1000 * 60 * 10, //10 minutes
    max: 1,
    message: "Too many requests. Please wait before retrying"
})

export const changeActiveStatusLimiter = createLimiter({
    windowMs: 1000 * 60 * 5, //10 minutes
    max: 10,
    message: "Too many requests. Please wait before retrying"
})


export const getFarmLand = createLimiter({
    windowMs: 1000 * 60 * 60 * 24,
    max: 100000,
    message: "Server is busy right now , try again later"
})