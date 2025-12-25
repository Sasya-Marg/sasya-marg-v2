import { createLimiter } from "./rateLimiter.middleware.js";


export const getSuggestionLimiter = createLimiter({
    windowMs: 1000 * 60 * 10,
    max: 1,
    message: "Service under cool down , please wait.."
})