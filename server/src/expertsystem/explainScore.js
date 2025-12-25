export const explainScore = ({ reasons, facts, confidence }) => {
  const missing = []

  if (facts.budgetLevel === "unknown") missing.push("budget")
  if (facts.irrigationLevel === "unknown") missing.push("irrigation")
  if (facts.previousCrop === "unknown") missing.push("previous crop")

  let note = "Prediction based on available data"

  if (missing.length) {
    note = `Prediction may vary. Missing data: ${missing.join(", ")}`
  }

  let confidenceNote = "Low confidence"
  if (confidence.level === "High") confidenceNote = "Highly reliable suggestion"
  else if (confidence.level === "Medium")
    confidenceNote = "Moderately reliable suggestion"

  return {
    reasons,
    note,
    confidenceNote,
    missingFactors: missing
  }
}
