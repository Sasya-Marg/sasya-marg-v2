import { FarmLand } from "../models/farmLand.model.js";
import { Location } from "../models/location.model.js";
import { resolveLocation } from "./location.service.js";
import { Farmer } from '../models/farmer.model.js'
import { ApiError } from "../utils/apiError.js";
import { getWeatherService } from "./weather.service.js";
import { PreviousCrop } from '../models/previousCrop.model.js'



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

export const getFarmlandFromId = async ({ farmlandId, farmerId }) => {
    const farmlandDoc = await FarmLand.findOne({ _id: farmlandId, owner: farmerId }).populate("location")
    const previousCrop = await PreviousCrop.findOne({ farmLand: farmlandId })

    if (!farmlandDoc) throw new ApiError(404, "farmland not found")

    if (!farmlandDoc.location) throw new ApiError(404, "No location found for farmland")

    const weather = await getWeatherService(farmlandDoc.location._id)

    const farmland = farmlandDoc.toJSON()
    farmland.weather = weather
    if (previousCrop) {
        farmland.previousCrop = {
            name: previousCrop.name,
            season: previousCrop.season,
            year: previousCrop.year,
        } || null
    }


    return farmland


}

export const getAllFarmsService = async ({ farmerId }) => {
    return await FarmLand.find({ owner: farmerId }).populate({
        path: "location",
        select: "locality district state"
    }).sort({ createdAt: -1 })
}

export const toggleFarmLandActiveStatusService = async ({ farmerId, farmLandId }) => {
    const farmland = await FarmLand.findOne({ _id: farmLandId, owner: farmerId })

    if (!farmland) throw new ApiError(404, "No farmland found")

    farmland.isActive = !farmland.isActive
    await farmland.save()

    return farmland
}