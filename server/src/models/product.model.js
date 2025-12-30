import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true
    },

    farmland: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FarmLand",
        required: true
    },
    category: {
        type: String,
        enum: ["vegetable", "fruit", "grain"],
        index: true,
        required: true
    },

    price: {
        value: {
            type: Number,
            min: 0,
            required: true
        },
        unit: {
            type: String,
            enum: ["per_kg", "per_quintal", "per_ton"],
            required: true

        }
    },

    stock: {
        value: {
            type: Number,
            min: 0.01
        },
        unit: {
            type: String,
            enum: ["kg", "quintal", "ton"],

        }
    },

    images: [
        {
            url: String,
            publicId: String
        }
    ],

    isActive: {
        type: Boolean,
        default: true
    },

    moderation: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        index: true
    },

    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },

    reviewedAt: {
        type: Date
    },

    rejectionReason: {
        type: String
    }

}, { timestamps: true })

productSchema.index({ category: 1, moderation: 1, isActive: 1 })

export const Product = mongoose.model("Product", productSchema)