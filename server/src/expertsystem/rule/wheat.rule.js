
export const wheatRules = [
  {
    conditions: {
      all: [
        {
          fact: "soilType",
          operator: "in",
          value: ["loamy", "silty", "alluvial"]
        }
      ]
    },
    event: {
      type: "soil_match",
      params: { crop: "Wheat" }
    }
  },

  {
    conditions: {
      all: [
        {
          fact: "temperature",
          operator: "greaterThanInclusive",
          value: 10
        },
        {
          fact: "temperature",
          operator: "lessThanInclusive",
          value: 25
        }
      ]
    },
    event: {
      type: "temperature_match",
      params: { crop: "Wheat" }
    }
  },

  {
    conditions: {
      all: [
        {
          fact: "rainfall",
          operator: "greaterThanInclusive",
          value: 50
        },
        {
          fact: "rainfall",
          operator: "lessThanInclusive",
          value: 150
        }
      ]
    },
    event: {
      type: "rainfall_match",
      params: { crop: "Wheat" }
    }
  },

  {
    conditions: {
      all: [
        {
          fact: "season",
          operator: "in",
          value: ["rabi", "winter"]
        }
      ]
    },
    event: {
      type: "season_match",
      params: { crop: "Wheat" }
    }
  },

  {
    conditions: {
      all: [
        {
          fact: "budget",
          operator: "greaterThanInclusive",
          value: 15000
        },
        {
          fact: "budget",
          operator: "lessThanInclusive",
          value: 30000
        }
      ]
    },
    event: {
      type: "budget_match",
      params: { crop: "Wheat" }
    }
  }
];
