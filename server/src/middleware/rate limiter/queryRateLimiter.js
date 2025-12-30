import { createLimiter } from "./rateLimiter.middleware.js";

export const sendQueryLimit = createLimiter({
    windowMs: 1000 * 60 * 60 * 24,//24h,
    max: 5,
    message: "Service is under cool down"
})