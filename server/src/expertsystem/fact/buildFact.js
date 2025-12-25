import { FarmLand } from "../../models/farmLand.model.js"
import { PreviousCrop } from "../../models/previousCrop.model.js"
import { getWeatherService } from "../../services/weather.service.js"
import { ApiError } from "../../utils/apiError.js"

export const buildFact = async ({ farmerId, farmLandId }) => {
  const farmland = await FarmLand.findOne({
    _id: farmLandId,
    owner: farmerId
  }).populate("location").lean()

  if (!farmland) throw new ApiError(404, "Farmland not found")

  const previousCrop = await PreviousCrop.findOne({ farmLand: farmLandId }).lean()

  const weather = farmland.location
    ? await getWeatherService(farmland.location._id, "current")
    : null

  const month = new Date().getMonth() + 1
  let season = "unknown"

  if ([6, 7, 8, 9].includes(month)) season = "kharif"
  else if ([10, 11, 12, 1, 2].includes(month)) season = "rabi"
  else if ([3, 4, 5].includes(month)) season = "zaid"

  const derivedFacts = {
    soilType: farmland.soilType,
    season,

    temperature: weather?.temperature ?? null,
    rainfall: weather?.rainfall ?? null,

    budgetLevel: farmland.budget
      ? farmland.budget < 15000
        ? "low"
        : farmland.budget < 30000
        ? "medium"
        : "high"
      : "unknown",

    irrigationLevel: farmland.water?.type
      ? ["canal", "borewell"].includes(farmland.water.type)
        ? "high"
        : "medium"
      : "unknown",

    previousCrop: previousCrop?.name ?? "unknown"
  }

  const confidence = {
    budget: farmland.budget ? 1 : 0,
    water: farmland.water?.type ? 1 : 0,
    weather: weather ? 1 : 0.7,
    previousCrop: previousCrop ? 1 : 0
  }

  return {
    facts: derivedFacts,
    confidence,
    weatherSnapshot: weather
  }
}
