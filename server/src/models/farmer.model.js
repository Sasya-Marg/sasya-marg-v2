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

}, { timestamps: true })


farmerSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next
    }

    this.password = await bcrypt.hash(this.password, 10)
})

export const Farmer = mongoose.model("Farmer", farmerSchema)