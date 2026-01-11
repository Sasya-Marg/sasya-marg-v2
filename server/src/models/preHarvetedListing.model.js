import mongoose from "mongoose"

const preHarvestListingSchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer",
            required: true,
            index: true
        },

        farmland: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FarmLand",
            required: true,
            index: true
        },

        sowingDate: {
            type: Date,
            required: true
        },

        expectedHarvest: {
            type: Date,
            required: true
        },

        productType: {
            type: String,
            enum: ["pre-harvest"],
            default: "pre-harvest",
        },

        expectedyeild: {
            value: {
                type: Number,

                min: 0.01
            },
            unit: {
                type: String,
                enum: ["kg", "quintal", "ton"],

            }
        },

        category: {
            type: String,
            enum: [
                "vegetable",
                "fruit",
                "grain",
                "pulse",
                "oilseed",
                "spice",
                "other",
            ],
            default: "other",
            index: true
        },

        expectedPrice: {
            value: {
                type: Number,

                min: 0
            },
            unit: {
                type: String,
                enum: ["per_kg", "per_quintal", "per_ton"],

            }
        },

        minimumOrderQuantity: {
            value: {
                type: Number,
                min: 0.01
            },
            unit: {
                type: String,
                enum: ["kg", "quintal", "ton"],
            }
        },

        qualityGrade: {
            type: String,
            enum: ["A", "B", "C", "organic"],
        },

        description: {
            type: String,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },

        images: [
            {
                url: String,
                publicId: String
            }
        ],

        status: {
            type: String,
            enum: ["open", "booked", "harvested", "cancelled"],
            default: "open",
            index: true
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
    },
    {
        timestamps: true
    }
)

export const PreHarvestListing = mongoose.model(
    "PreHarvestListing",
    preHarvestListingSchema
)
