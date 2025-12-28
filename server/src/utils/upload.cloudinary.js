import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'
import fs from 'fs/promises'
import path from 'path'
import { ApiError } from './apiError.js'
config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const uploadToCloudinary = async (localFilePath) => {
    try {
        const upload = await cloudinary.uploader.upload(
            localFilePath,
            { resource_type: 'image' }
        )

        const absolutePath = path.resolve(localFilePath)
        await fs.unlink(absolutePath)
        return { url: upload.secure_url, publicId: upload.public_id }

    } catch (error) {
        if (localFilePath) {
            const absolutePath = path.resolve(localFilePath)
            await fs.unlink(absolutePath)
        }
        throw new ApiError(500, "Image upload Failed")

    }
}

export const deleteUploadedFile = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
        return true
    } catch (error) {
        console.log("Cloudinary deletion Error....")
        throw new ApiError(500, "Image destroy Failed")
    }

}