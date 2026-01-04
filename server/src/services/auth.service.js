import { Farmer } from "../models/farmer.model.js"
import {Admin} from "../models/admin.model.js"
import { Buyer } from "../models/buyer.model.js"


export const currentUserService = async ({ req }) => {
    if(req.user.role === 'farmer'){
        const farmer = await Farmer.findById(req.user._id)
        return {
            role : req.user.role,
            user : {
                _id : farmer._id,
                fullname : farmer.fullname,
                email : farmer.email,
                phone : farmer.phone,
            }
        }
    }

    if(req.user.role === 'admin'){
        const admin = await Admin.findById(req.user._id)
        return {
            role : req.user.role,
            user : {
                _id : admin._id,
                fullname : admin.fullname,
                email : admin.email,
                phone : admin.phone,
            }
        }
    }

    if(req.user.role === 'buyer'){
        const buyer = await Buyer.findById(req.user._id)
        return {
            role : req.user.role,
            user : {
                _id : buyer._id,
                fullname : buyer.fullname,
                email : buyer.email,    
                phone : buyer.phone,
            }
        }
    }
}