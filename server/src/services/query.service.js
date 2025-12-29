import { Query } from "../models/query.model.js"
import { ApiError } from "../utils/apiError.js"

export const createQueryService = async ({ payload, farmerId }) => {
    const query = await Query.create({
        ...payload,
        farmer: farmerId,
        status: "open",
    })

    return query
}