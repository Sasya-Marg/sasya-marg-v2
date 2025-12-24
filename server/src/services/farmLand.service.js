import { FarmLand } from "../models/farmLand.model.js";
import { Location } from "../models/location.model.js";
import { resolveLocation } from "./location.service.js";
import { Farmer } from '../models/farmer.model.js'
import { ApiError } from "../utils/apiError.js";



export const createFarmLandService = async ({ farmerId, payload }) => {
    const { location, ...farmLandData } = payload

    const { locality, state, district, coordinates, country } = await resolveLocation(location)

    const lat = Number(coordinates.lat.toFixed(4));
    const lon = Number(coordinates.lon.toFixed(4));


    let existingLocation = await Location.findOne({
        "coordinates.lat": lat,
        "coordinates.lon": lon
    });



    if (!existingLocation) {
        existingLocation = await Location.create({
            locality,
            state,
            district,
            country,
            coordinates: { lat, lon }
        })
    }

    const farmland = await FarmLand.create({
        location: existingLocation._id,
        owner: farmerId,
        ...farmLandData
    })

    return farmland
}

export const updateFarmLandService = async ({ farmerId, farmLandId, payload }) => {
    const farmland = await FarmLand.findOne({ _id: farmLandId, owner: farmerId })

    if (!farmland) {
        throw new ApiError(404, "Farmland not found or access denied");
    }

    const allowedUpdates = [
        "name",
        "soilType",
        "water",
        "budget",
        "farmingType"
    ];

    allowedUpdates.forEach((field) => {
        if (payload[field] !== undefined) {
            farmland[field] = payload[field];
        }
    });

    await farmland.save();

    return farmland;

}

export const getAllFarmsService = async ({ farmerId }) => {
    return await FarmLand.find({ owner: farmerId })
}

export const toggleFarmLandActiveStatusService = async ({ farmerId, farmLandId }) => {
    const farmland = await FarmLand.findOne({ _id: farmLandId, owner: farmerId })

    if (!farmland) throw new ApiError(404, "No farmland found")

    farmland.isActive = !farmland.isActive
    await farmland.save()

    return farmland
}