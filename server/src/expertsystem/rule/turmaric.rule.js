export const turmericRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "red", "laterite"] }] },
    event: { type: "soil_match", params: { crop: "Turmeric" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 30 }] },
    event: { type: "temperature_match", params: { crop: "Turmeric" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 1000 }, { fact: "rainfall", operator: "lessThanInclusive", value: 2000 }] },
    event: { type: "rainfall_match", params: { crop: "Turmeric" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif", "monsoon"] }] },
    event: { type: "season_match", params: { crop: "Turmeric" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 30000 }, { fact: "budget", operator: "lessThanInclusive", value: 50000 }] },
    event: { type: "budget_match", params: { crop: "Turmeric" } }
  }
];