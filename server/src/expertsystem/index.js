import { Crop } from "../models/crop.model.js"
import { calculateConfidence } from "./calculateConfidence.js"
import { explainScore } from "./explainScore.js"
import { buildFact } from './fact/buildFact.js'
import {scoreCrop} from './scoring/scoreCalculator.js'

export const runCropExpertSystem = async ({ farmerId, farmLandId }) => {
  const { facts, confidence, weatherSnapshot } = await buildFact({
    farmerId,
    farmLandId
  })

  const crops = await Crop.find().lean()

  const scored = crops.map(crop => {
    const { score, reasons } = scoreCrop({ crop, facts })

    const confidenceResult = calculateConfidence({
      score,
      confidenceMap: confidence
    })

    const explanation = explainScore({
      reasons,
      facts,
      confidence: confidenceResult
    })

    return {
      crop: crop.name,
      cropId: crop._id,
      durationRange: crop.durationRange,
      score,
      confidence: confidenceResult,
      ...explanation
    }
  })


  const recommendations = scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return {
    facts,
    confidence,
    weatherSnapshot,
    recommendations
  }
}
