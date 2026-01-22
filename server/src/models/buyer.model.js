import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const addressSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            trim: true
        },

        addressLine: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true
        }
    },
    { _id: false }
)

const buyerSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },

        phone: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        role: {
        type: String,
        enum: ["buyer"],
        immutable: true,
        default: "buyer"
    },

        address: {
            type: addressSchema,
            default: null
        },

        isBlocked: {
            type: Boolean,
            default: false
        },
        
        blockedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            default: null
        },

        blockedAt: {
            type: Date,
            default: null
        },

        blockReason: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
)

buyerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 10)
})

buyerSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

export const Buyer = mongoose.model("Buyer", buyerSchema)
