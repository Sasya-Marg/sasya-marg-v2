export const maizeRules = [
    {
        conditions: { all: [{ fact: "soilType", operator: "in", value: ["loamy", "alluvial", "red"] }] },
        event: { type: "soil_match", params: { crop: "Maize (Corn)" } }
    },
    {
        conditions: { all: [{ fact: "temperature", operator: "greaterThanInclusive", value: 18 }, { fact: "temperature", operator: "lessThanInclusive", value: 30 }] },
        event: { type: "temperature_match", params: { crop: "Maize (Corn)" } }
    },
    {
        conditions: { all: [{ fact: "rainfall", operator: "greaterThanInclusive", value: 500 }, { fact: "rainfall", operator: "lessThanInclusive", value: 900 }] },
        event: { type: "rainfall_match", params: { crop: "Maize (Corn)" } }
    },
    {
        conditions: { all: [{ fact: "season", operator: "in", value: ["kharif", "rabi"] }] },
        event: { type: "season_match", params: { crop: "Maize (Corn)" } }
    },
    {
        conditions: { all: [{ fact: "budget", operator: "greaterThanInclusive", value: 10000 }, { fact: "budget", operator: "lessThanInclusive", value: 18000 }] },
        event: { type: "budget_match", params: { crop: "Maize (Corn)" } }
    }
];