import { ApiError } from '../utils/apiError.js'
import { PreHarvestListing } from '../models/preHarvetedListing.model.js'
import { FarmLand } from '../models/farmLand.model.js'
import { uploadToCloudinary } from '../utils/upload.cloudinary.js'
import { Location } from '../models/location.model.js'


export const createPreHarvestListingService = async ({ farmerId, payload, files }) => {
    const farmLand = await FarmLand.findOne({
        owner: farmerId,
        _id: payload.farmland,
        isActive: true
    })

    if (!farmLand) throw new ApiError(403, "Invalid or Inactive farmland")

    let images = []

    if (files && files.length > 0) {
        for (let file of files) {

            const { url, publicId } = await uploadToCloudinary(file.path)
            images.push({ url, publicId })
        }
    }

    const listing = await PreHarvestListing.create({
        farmer: farmerId,
        ...payload,
        images,
        status: "Open",
        moderation: "pending"
    })

    return listing
}


export const getPreHarvestListingService = async (query) => {
    const {
        page = 1,
        limit = 10,
        state,
        city,
        qualityGrade,
        minPrice,
        maxPrice,
        sort
    } = query


    const filter = {
        moderation: 'approved',
        status: 'Open'
    }


    if (state || city) {
        const locationQuery = {}

        if (state) locationQuery.state = state
        if (city) locationQuery.city = city

        const locations = await Location.find(locationQuery).select("_id")

        if (!locations || locations.length < 1) {
            return {
                listings: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: 0
                }
            }
        }

        const farmlands = await FarmLand.find({
            location: { $in: locations.map(f => f._id) },
            isActive: true
        }).select("_id")

        if (!farmlands.length) {
            return {
                listings: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: 0
                }
            }
        }

        filter.farmland = { $in: farmlands.map(f => f._id) }
    }

    if (qualityGrade) {
        filter.qualityGrade = qualityGrade
    }

    if (minPrice || maxPrice) {
        filter["expectedPrice.value"] = {}
        if (minPrice) filter["expectedPrice.value"].$gte = Number(minPrice)
        if (maxPrice) filter["expectedPrice.value"].$gte = Number(maxPrice)
    }

    let sortOption = { createdAt: -1 }

    if (sort === "price_asc") {
        sortOption = { "expectedPrice.value": 1 }
    }

    if (sort === "price_desc") {
        sortOption = { "expectedPrice.value": -1 }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [listings, total] = await Promise.all([
        PreHarvestListing.find(filter).populate({
            path: "farmland",
            select: "name , size , location",
            populate: {
                path: 'location',
                select: "city state district "
            }
        }).populate('farmer', 'fullname phone')
            .sort(sortOption)
            .skip(skip)
            .limit(limit),

        PreHarvestListing.countDocuments(filter)
    ])


    return {
        listings,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }

}

export const getMyPreHarvestListingService = async (farmerId, query) => {
    const { page = 1, limit = 10, status, moderation } = query

    const filter = {
        farmer: farmerId
    }

    if (status) {
        filter.status = status
    }

    if (moderation) {
        filter.moderation = moderation
    }

    const skip = (Number(page) - 1) * limit

    const [listings, total] = await Promise.all([
        PreHarvestListing.find(filter).populate({
            path: "farmland",
            select: "location name size",
            populate: {
                path: "location",
                select: "state locality district "
            }
        }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        PreHarvestListing.countDocuments(filter)
    ])

    return {
        listings,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}

