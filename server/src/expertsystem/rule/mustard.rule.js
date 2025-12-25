export const mustardRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "alluvial"] }] },
    event: { type: "soil_match", params: { crop: "Mustard" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 10 }, { fact: "temperature", operator: "lessThanInclusive", value: 25 }] },
    event: { type: "temperature_match", params: { crop: "Mustard" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 350 }, { fact: "rainfall", operator: "lessThanInclusive", value: 550 }] },
    event: { type: "rainfall_match", params: { crop: "Mustard" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["rabi"] }] },
    event: { type: "season_match", params: { crop: "Mustard" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 7000 }, { fact: "budget", operator: "lessThanInclusive", value: 12000 }] },
    event: { type: "budget_match", params: { crop: "Mustard" } }
  }
];