import { ApiError } from '../utils/apiError.js'


export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        console.log("Request in validate middleware")

        next()
    } catch (error) {
        console.log(error)
        throw new ApiError(400, error?.errors[0]?.message || "Invalid data feilds");
    }
}