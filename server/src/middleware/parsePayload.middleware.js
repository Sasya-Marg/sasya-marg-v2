import { ApiError } from "../utils/apiError.js"

export const parsePayload = (req, res, next) => {
  if (req.body.payload && typeof req.body.payload === "string") {
    try {
      req.body.payload = JSON.parse(req.body.payload)
    } catch (err) {
      throw new ApiError(400, "Invalid payload JSON")
    }
  }
  next()
}
