import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true
    },

    phone: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastLogin: {
        type: Date
    },

    role: {
        type: String,
        enum: ["admin", "super_admin"],
        default: "admin"
    }
}, { timestamps: true })

adminSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next
    this.password = await bcrypt.hash(this.password, 10)
})

adminSchema.methods.comparePassword = async function (password) {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
}


export const Admin = mongoose.model("Admin", adminSchema)