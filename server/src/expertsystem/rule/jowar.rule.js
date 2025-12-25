export const jowarRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["black", "red", "loamy"] }] },
    event: { type: "soil_match", params: { crop: "Jowar (Sorghum)" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 25 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
    event: { type: "temperature_match", params: { crop: "Jowar (Sorghum)" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 400 }, { fact: "rainfall", operator: "lessThanInclusive", value: 700 }] },
    event: { type: "rainfall_match", params: { crop: "Jowar (Sorghum)" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif", "rabi"] }] },
    event: { type: "season_match", params: { crop: "Jowar (Sorghum)" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 6000 }, { fact: "budget", operator: "lessThanInclusive", value: 12000 }] },
    event: { type: "budget_match", params: { crop: "Jowar (Sorghum)" } }
  }
];