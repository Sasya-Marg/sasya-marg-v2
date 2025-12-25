export const sugarcaneRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "alluvial", "clay"] }] },
    event: { type: "soil_match", params: { crop: "Sugarcane" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 40 }] },
    event: { type: "temperature_match", params: { crop: "Sugarcane" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 1100 }, { fact: "rainfall", operator: "lessThanInclusive", value: 2200 }] },
    event: { type: "rainfall_match", params: { crop: "Sugarcane" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif", "summer"] }] },
    event: { type: "season_match", params: { crop: "Sugarcane" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 25000 }, { fact: "budget", operator: "lessThanInclusive", value: 45000 }] },
    event: { type: "budget_match", params: { crop: "Sugarcane" } }
  }
];