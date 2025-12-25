export const calculateConfidence = ({ score, confidenceMap }) => {
  const maxScore = 105
  const base = Math.min(score / maxScore, 1)

  const reliability =
    (confidenceMap.budget +
      confidenceMap.water +
      confidenceMap.weather +
      confidenceMap.previousCrop) /
    4

  const final = Math.round(base * reliability * 100)

  let level = "Low"
  if (final >= 70) level = "High"
  else if (final >= 40) level = "Medium"

  return {
    percentage: final,
    level
  }
}
