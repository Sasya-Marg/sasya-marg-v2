export const cottonRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["black", "alluvial"] }] },
    event: { type: "soil_match", params: { crop: "Cotton" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 21 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
    event: { type: "temperature_match", params: { crop: "Cotton" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 500 }, { fact: "rainfall", operator: "lessThanInclusive", value: 800 }] },
    event: { type: "rainfall_match", params: { crop: "Cotton" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif"] }] },
    event: { type: "season_match", params: { crop: "Cotton" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 20000 }, { fact: "budget", operator: "lessThanInclusive", value: 30000 }] },
    event: { type: "budget_match", params: { crop: "Cotton" } }
  }
];