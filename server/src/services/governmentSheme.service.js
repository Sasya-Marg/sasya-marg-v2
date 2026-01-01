import { GovernmentScheme } from "../models/governmentScheme.model.js"
import { Farmer } from "../models/farmer.model.js"
import { FarmLand } from "../models/farmLand.model.js"


export const createSchemeService = async (payload) => {
    return await GovernmentScheme.create(payload)
}

export const getAllSchemesAdminService = async (query) => {

    const { page = 1, limit = 10, isActive, state, crop } = query

    const filter = {}

    if (isActive !== undefined) filter.isActive = isActive === "true"
    if (state) filter["eligibility.states"] = state
    if (crop) filter["eligibility.cropTypes"] = crop

    const skip = (page - 1) * limit

    const [schemes, total] = await Promise.all([
        GovernmentScheme.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        GovernmentScheme.countDocuments(filter)
    ])

    return {
        schemes,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit)
        }
    }
}

export const updateSchemeService = async (id, payload) => {
    return await GovernmentScheme.findByIdAndUpdate(id, payload, { new: true })
}

export const toggleSchemeService = async (id) => {
    const scheme = await GovernmentScheme.findById(id)
    scheme.isActive = !scheme.isActive
    await scheme.save()
    return scheme
}



export const getSchemesForFarmerService = async ({ farmerId, farmLandId }) => {

    const farmer = await Farmer.findById(farmerId)
    const farmLand = await FarmLand.findById(farmLandId)

    const filter = {
        isActive: true,
        validFrom: { $lte: new Date() },
        validTill: { $gte: new Date() }
    }

    filter["eligibility.states"] = farmer.address.state
    filter["eligibility.cropTypes"] = farmLand.cropType

    filter["eligibility.landSizeMin"] = { $lte: farmLand.size }
    filter["eligibility.landSizeMax"] = { $gte: farmLand.size }

    return await GovernmentScheme.find(filter).sort({ createdAt: -1 })
}
