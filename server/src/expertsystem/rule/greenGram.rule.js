export const greenGramRules = [
    {
        conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "sandy"] }] },
        event: { type: "soil_match", params: { crop: "Green Gram (Moong)" } }
    },
    {
        conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 25 }, { fact: "temperature", operator: "lessThanInclusive", value: 35 }] },
        event: { type: "temperature_match", params: { crop: "Green Gram (Moong)" } }
    },
    {
        conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 350 }, { fact: "rainfall", operator: "lessThanInclusive", value: 600 }] },
        event: { type: "rainfall_match", params: { crop: "Green Gram (Moong)" } }
    },
    {
        conditions: { all: [{ fact: "season", operator: "in", value: ["zaid", "kharif"] }] },
        event: { type: "season_match", params: { crop: "Green Gram (Moong)" } }
    },
    {
        conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 5000 }, { fact: "budget", operator: "lessThanInclusive", value: 9000 }] },
        event: { type: "budget_match", params: { crop: "Green Gram (Moong)" } }
    }
];