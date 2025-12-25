export const scoreCrop = ({ crop, facts }) => {
  let score = 0
  const reasons = []

  if (crop.suitableSoilType.includes(facts.soilType)) {
    score += 30
    reasons.push("Soil type suitable")
  }

  if (facts.season !== "unknown" && crop.seasons.includes(facts.season)) {
    score += 15
    reasons.push("Season suitable")
  }

  if (facts.temperature !== null) {
    if (
      facts.temperature >= crop.temperatureRange.min &&
      facts.temperature <= crop.temperatureRange.max
    ) {
      score += 20
      reasons.push("Temperature suitable")
    }
  }

  if (facts.rainfall !== null) {
    if (
      facts.rainfall >= crop.rainfallRange.min &&
      facts.rainfall <= crop.rainfallRange.max
    ) {
      score += 25
      reasons.push("Rainfall suitable")
    }
  }

  if (facts.budgetLevel !== "unknown") {
    const mid =
      (crop.budgetRange.min + crop.budgetRange.max) / 2

    if (
      (facts.budgetLevel === "low" && mid < 20000) ||
      (facts.budgetLevel === "medium" && mid >= 15000 && mid <= 30000) ||
      (facts.budgetLevel === "high" && mid > 25000)
    ) {
      score += 10
      reasons.push("Budget suitable")
    }
  }

  if (facts.previousCrop !== "unknown") {
    if (facts.previousCrop !== crop.name) {
      score += 5
      reasons.push("Good crop rotation")
    } else {
      score -= 10
      reasons.push("Repeated crop detected")
    }
  }

  return { score, reasons }
}
