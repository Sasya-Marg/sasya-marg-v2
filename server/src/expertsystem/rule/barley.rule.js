export const barleyRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["sandy", "loamy"] }] },
    event: { type: "soil_match", params: { crop: "Barley" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 10 }, { fact: "temperature", operator: "lessThanInclusive", value: 25 }] },
    event: { type: "temperature_match", params: { crop: "Barley" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 200 }, { fact: "rainfall", operator: "lessThanInclusive", value: 400 }] },
    event: { type: "rainfall_match", params: { crop: "Barley" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["rabi"] }] },
    event: { type: "season_match", params: { crop: "Barley" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 8000 }, { fact: "budget", operator: "lessThanInclusive", value: 12000 }] },
    event: { type: "budget_match", params: { crop: "Barley" } }
  }
];