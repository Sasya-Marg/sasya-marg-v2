import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const farmerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    isContactVisible: {
        type: Boolean,
        default: true
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isActive: {   //check user block status
        type: Boolean,
        default: true
    },

    role: {
        type: String,
        enum: ["farmer"],
        immutable: true,
        default: "farmer"
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

}, { timestamps: true })


farmerSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next
    }

    this.password = await bcrypt.hash(this.password, 10)
})

export const Farmer = mongoose.model("Farmer", farmerSchema)