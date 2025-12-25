export const soybeanRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "black"] }] },
    event: { type: "soil_match", params: { crop: "Soybean" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
    event: { type: "temperature_match", params: { crop: "Soybean" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 600 }, { fact: "rainfall", operator: "lessThanInclusive", value: 1000 }] },
    event: { type: "rainfall_match", params: { crop: "Soybean" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif"] }] },
    event: { type: "season_match", params: { crop: "Soybean" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 10000 }, { fact: "budget", operator: "lessThanInclusive", value: 16000 }] },
    event: { type: "budget_match", params: { crop: "Soybean" } }
  }
];