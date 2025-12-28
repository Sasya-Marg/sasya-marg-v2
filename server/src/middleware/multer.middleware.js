import multer from 'multer'
import { ApiError } from '../utils/apiError.js'


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/temp")
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})


const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new ApiError(400, "Only image files are allowed"), false)
  }
  cb(null, true)
}



export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})