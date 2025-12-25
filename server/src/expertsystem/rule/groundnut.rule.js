export const groundnutRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["sandy", "loamy", "red"] }] },
    event: { type: "soil_match", params: { crop: "Groundnut" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 30 }] },
    event: { type: "temperature_match", params: { crop: "Groundnut" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 500 }, { fact: "rainfall", operator: "lessThanInclusive", value: 800 }] },
    event: { type: "rainfall_match", params: { crop: "Groundnut" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif", "rabi"] }] },
    event: { type: "season_match", params: { crop: "Groundnut" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 10000 }, { fact: "budget", operator: "lessThanInclusive", value: 18000 }] },
    event: { type: "budget_match", params: { crop: "Groundnut" } }
  }
];