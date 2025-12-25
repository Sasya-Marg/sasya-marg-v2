export const tomatoRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "black", "red"] }] },
    event: { type: "soil_match", params: { crop: "Tomato" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 15 }, { fact: "temperature", operator: "lessThanInclusive", value: 30 }] },
    event: { type: "temperature_match", params: { crop: "Tomato" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 400 }, { fact: "rainfall", operator: "lessThanInclusive", value: 700 }] },
    event: { type: "rainfall_match", params: { crop: "Tomato" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["zaid", "rabi", "kharif"] }] },
    event: { type: "season_match", params: { crop: "Tomato" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 20000 }, { fact: "budget", operator: "lessThanInclusive", value: 40000 }] },
    event: { type: "budget_match", params: { crop: "Tomato" } }
  }
];