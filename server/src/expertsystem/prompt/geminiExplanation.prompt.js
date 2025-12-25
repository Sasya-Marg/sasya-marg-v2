export const buildGeminiExplanationPrompt = ({
    crop,
    facts,
    reasons
}) => {
    return `
You are an agricultural advisory assistant.

Explain in simple, farmer-friendly language
WHY the following crop is recommended.

Crop Name: ${crop.name}
Crop Duration: ${crop.durationRange?.min}-${crop.durationRange?.max} days
Water Requirement: ${crop.waterRequirement}

Farmland & Weather Conditions:
- Soil Type: ${facts.soilType}
- Season: ${facts.season}
- Temperature: ${facts.temperature} °C
- Rainfall: ${facts.rainfall} mm
- Budget: ${facts.budget}

Matched Reasons:
${reasons.join(", ")}

Rules:
- Do NOT suggest new crops
- Do NOT change the recommendation
- Do NOT mention scores or rules
- Use simple language
- Response must be in json formate dont use a single word rather then json response , so i can use it as real api directly
`;
};
