export const bajraRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["sandy", "loamy", "red"] }] },
    event: { type: "soil_match", params: { crop: "Bajra (Pearl Millet)" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
    event: { type: "temperature_match", params: { crop: "Bajra (Pearl Millet)" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 300 }, { fact: "rainfall", operator: "lessThanInclusive", value: 600 }] },
    event: { type: "rainfall_match", params: { crop: "Bajra (Pearl Millet)" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif"] }] },
    event: { type: "season_match", params: { crop: "Bajra (Pearl Millet)" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 5000 }, { fact: "budget", operator: "lessThanInclusive", value: 10000 }] },
    event: { type: "budget_match", params: { crop: "Bajra (Pearl Millet)" } }
  }
];