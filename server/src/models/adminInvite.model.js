import mongoose from 'mongoose'

const adminInviteSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },

    role: {
        type: String,
        enum: ['admin'],
        default: "admin"
    },

    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },

    used: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const AdminInvite = mongoose.model("AdminInvite", adminInviteSchema)