export const chickpeaRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "alluvial"] }] },
    event: { type: "soil_match", params: { crop: "Chickpea (Gram)" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 15 }, { fact: "temperature", operator: "lessThanInclusive", value: 25 }] },
    event: { type: "temperature_match", params: { crop: "Chickpea (Gram)" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 300 }, { fact: "rainfall", operator: "lessThanInclusive", value: 500 }] },
    event: { type: "rainfall_match", params: { crop: "Chickpea (Gram)" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["rabi"] }] },
    event: { type: "season_match", params: { crop: "Chickpea (Gram)" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 8000 }, { fact: "budget", operator: "lessThanInclusive", value: 15000 }] },
    event: { type: "budget_match", params: { crop: "Chickpea (Gram)" } }
  }
];