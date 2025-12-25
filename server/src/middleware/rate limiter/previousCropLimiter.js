import { createLimiter } from "./rateLimiter.middleware.js";

export const previousCropLimiter = createLimiter({
    windowMs: 1000 * 60 * 10,
    max: 10,
    message: "Too many attempts, Try later"
})