export const pigeonPeaRules = [
  {
    conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "alluvial", "black"] }] },
    event: { type: "soil_match", params: { crop: "Pigeon Pea (Arhar/Tur)" } }
  },
  {
    conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 20 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
    event: { type: "temperature_match", params: { crop: "Pigeon Pea (Arhar/Tur)" } }
  },
  {
    conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 500 }, { fact: "rainfall", operator: "lessThanInclusive", value: 800 }] },
    event: { type: "rainfall_match", params: { crop: "Pigeon Pea (Arhar/Tur)" } }
  },
  {
    conditions: { all: [{ fact: "season", operator: "in", value: ["kharif"] }] },
    event: { type: "season_match", params: { crop: "Pigeon Pea (Arhar/Tur)" } }
  },
  {
    conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 7000 }, { fact: "budget", operator: "lessThanInclusive", value: 12000 }] },
    event: { type: "budget_match", params: { crop: "Pigeon Pea (Arhar/Tur)" } }
  }
];