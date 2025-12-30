import { ApiError } from '../utils/apiError.js'
import { Product } from '../models/product.model.js'
import { FarmLand } from '../models/farmLand.model.js'
import { uploadToCloudinary, deleteUploadedFile } from '../utils/upload.cloudinary.js'


export const createProductListing = async ({ farmerId, payload, files }) => {
    const farmland = await FarmLand.findOne({
        owner: farmerId,
        _id: payload.farmlandId,
        isActive: true
    }).select("_id")

    if (!farmland) throw new ApiError(403, "Invalid or inactive farmland")

    let images = []

    if (files?.length) {
        for (const file of files) {
            const { url, publicId } = await uploadToCloudinary(file.path)
            images.push({ url, publicId })
        }

    }


    const listing = await Product.create({
        farmer: farmerId,
        farmland: farmland._id,
        ...payload,
        isActive: true,
        moderation: "pending",
        images
    })

    return listing
}

export const myProductListings = async ({ farmerId, query }) => {

    const { page = 1, limit = 10, moderation, isActive } = query

    const filter = { farmer: farmerId }

    if (moderation) {
        filter.moderation = moderation
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === "true"
    }

    const skip = (Number(page - 1)) * limit

    const [products, total] = await Promise.all([
        Product.find(filter).populate({
            path: "farmland",
            select: "location name size",
            populate: {
                path: "location",
                select: "state locality district"
            }
        }).sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        Product.countDocuments(filter)
    ])

    return {
        products,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    }
}

export const updateProductListing = async ({ farmerId, listingId, payload, files = null }) => {
    console.log("liating id ::", listingId)

    const product = await Product.findOne({ _id: listingId, farmer: farmerId })

    if (!product) throw new ApiError(403, "You are not allowed to update listing")

    const allowedFields = [
        "title",
        "description",
        "price",
        "stock",
        "category",
        "isActive"
    ]

    for (let field of allowedFields) {
        if (payload[field] !== undefined) {
            product[field] = payload[field]
        }
    }

    //Image updation later

    const criticalFields = ["price", "category", "title"]

    if (criticalFields.some(f => payload[f] !== undefined)) {
        product.moderation = "pending"
    }
    await product.save()

    return product


}


export const deactivateProductListing = async ({ farmerId, listingId }) => {
    const product = await Product.findOne({ farmer: farmerId, _id: listingId })

    if (!product) throw new ApiError(403, "You are not allowed to update listing")

    product.isActive = !product.isActive
    await product.save()

    return product

}