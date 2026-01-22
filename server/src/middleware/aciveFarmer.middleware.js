import { Farmer } from "../models/farmer.model.js";

export const activeFarmer = async (req, res, next) => {

    if (req.user.role !== "farmer") {
        return next();
    }

    if (req.user.isActive === true) {
        return next();
    }

    const farmer = await Farmer.findById(req.user._id)
        .select("isActive blockReason blockedAt");

    if (!farmer || farmer.isActive === false) {
        return res.status(403).json({
            code: "FARMER_BLOCKED",
            message: "Your account has been blocked",
            reason: farmer?.blockReason ?? null,
            blockedAt: farmer?.blockedAt ?? null,
        });
    }


    return next();
};
