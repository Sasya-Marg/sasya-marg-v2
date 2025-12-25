export const sunflowerRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "black", "alluvial"] }] },
    event: { type: "soil_match", params: { crop: "Sunflower" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 28 }] },
    event: { type: "temperature_match", params: { crop: "Sunflower" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 300 }, { fact: "rainfall", operator: "lessThanInclusive", value: 600 }] },
    event: { type: "rainfall_match", params: { crop: "Sunflower" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["zaid", "kharif", "rabi"] }] },
    event: { type: "season_match", params: { crop: "Sunflower" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 8000 }, { fact: "budget", operator: "lessThanInclusive", value: 14000 }] },
    event: { type: "budget_match", params: { crop: "Sunflower" } }
  }
];