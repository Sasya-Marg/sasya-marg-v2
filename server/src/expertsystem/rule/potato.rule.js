export const potatoRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["sandy", "loamy"] }] },
    event: { type: "soil_match", params: { crop: "Potato" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 15 }, { fact: "temperature", operator: "lessThanInclusive", value: 25 }] },
    event: { type: "temperature_match", params: { crop: "Potato" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 300 }, { fact: "rainfall", operator: "lessThanInclusive", value: 600 }] },
    event: { type: "rainfall_match", params: { crop: "Potato" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["rabi", "winter"] }] },
    event: { type: "season_match", params: { crop: "Potato" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 25000 }, { fact: "budget", operator: "lessThanInclusive", value: 35000 }] },
    event: { type: "budget_match", params: { crop: "Potato" } }
  }
];