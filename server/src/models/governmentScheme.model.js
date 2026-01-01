import mongoose from "mongoose"

const governmentSchemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    eligibility: {
      cropTypes: [String],          // wheat, rice etc
      landSizeMin: Number,          // in acres
      landSizeMax: Number,
      states: [String],             // UP, MP, etc
      farmerCategory: {
        type: String,
        enum: ["small", "marginal", "large", "all"],
        default: "all"
      }
    },

    benefits: {
      type: String,
      required: true
    },

    documentsRequired: [String],

    validFrom: Date,
    validTill: Date,

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export const GovernmentScheme = mongoose.model(
  "GovernmentScheme",
  governmentSchemeSchema
)
