export const riceRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["clay", "loamy", "alluvial"] }] },
    event: { type: "soil_match", params: { crop: "Rice (Paddy)" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
    event: { type: "temperature_match", params: { crop: "Rice (Paddy)" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 1000 }, { fact: "rainfall", operator: "lessThanInclusive", value: 2500 }] },
    event: { type: "rainfall_match", params: { crop: "Rice (Paddy)" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif", "monsoon"] }] },
    event: { type: "season_match", params: { crop: "Rice (Paddy)" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 15000 }, { fact: "budget", operator: "lessThanInclusive", value: 25000 }] },
    event: { type: "budget_match", params: { crop: "Rice (Paddy)" } }
  }
];