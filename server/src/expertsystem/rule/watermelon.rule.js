export const watermelonRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["sandy", "loamy"] }] },
    event: { type: "soil_match", params: { crop: "Watermelon" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 25 }, { fact: "temperature", operator: "lessThanInclusive", value: 40 }] },
    event: { type: "temperature_match", params: { crop: "Watermelon" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 200 }, { fact: "rainfall", operator: "lessThanInclusive", value: 500 }] },
    event: { type: "rainfall_match", params: { crop: "Watermelon" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["zaid", "summer"] }] },
    event: { type: "season_match", params: { crop: "Watermelon" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 10000 }, { fact: "budget", operator: "lessThanInclusive", value: 18000 }] },
    event: { type: "budget_match", params: { crop: "Watermelon" } }
  }
];