export const onionRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "silty"] }] },
    event: { type: "soil_match", params: { crop: "Onion" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 15 }, { fact: "temperature", operator: "lessThanInclusive", value: 30 }] },
    event: { type: "temperature_match", params: { crop: "Onion" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 400 }, { fact: "rainfall", operator: "lessThanInclusive", value: 750 }] },
    event: { type: "rainfall_match", params: { crop: "Onion" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["rabi", "kharif"] }] },
    event: { type: "season_match", params: { crop: "Onion" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 18000 }, { fact: "budget", operator: "lessThanInclusive", value: 30000 }] },
    event: { type: "budget_match", params: { crop: "Onion" } }
  }
];