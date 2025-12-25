export const crops = [
    {
        name: "Rice (Paddy)",
        suitableSoilType: ["clay", "loamy", "alluvial"],
        seasons: ["kharif", "monsoon"],
        temperatureRange: { min: 20, max: 35 },
        rainfallRange: { min: 1000, max: 2500 },
        budgetRange: { min: 15000, max: 25000 },
        soilFertility: "high",
        durationRange: { min: 120, max: 150 }
    },
    {
        name: "Wheat",
        suitableSoilType: ["loamy", "clay", "alluvial"],
        seasons: ["rabi", "winter"],
        temperatureRange: { min: 10, max: 25 },
        rainfallRange: { min: 400, max: 1000 },
        budgetRange: { min: 12000, max: 20000 },
        soilFertility: "medium",
        durationRange: { min: 120, max: 140 }
    },
    {
        name: "Maize (Corn)",
        suitableSoilType: ["loamy", "alluvial", "red"],
        seasons: ["kharif", "rabi"],
        temperatureRange: { min: 18, max: 30 },
        rainfallRange: { min: 500, max: 900 },
        budgetRange: { min: 10000, max: 18000 },
        soilFertility: "medium",
        durationRange: { min: 90, max: 110 }
    },
    {
        name: "Cotton",
        suitableSoilType: ["black", "alluvial"],
        seasons: ["kharif"],
        temperatureRange: { min: 21, max: 35 },
        rainfallRange: { min: 500, max: 800 },
        budgetRange: { min: 20000, max: 30000 },
        soilFertility: "high",
        durationRange: { min: 150, max: 180 }
    },
    {
        name: "Sugarcane",
        suitableSoilType: ["loamy", "alluvial", "clay"],
        seasons: ["kharif", "summer"], // Often annual
        temperatureRange: { min: 20, max: 40 },
        rainfallRange: { min: 1100, max: 2200 },
        budgetRange: { min: 25000, max: 45000 },
        soilFertility: "high",
        durationRange: { min: 300, max: 365 }
    },
    {
        name: "Bajra (Pearl Millet)",
        suitableSoilType: ["sandy", "loamy", "red"],
        seasons: ["kharif"],
        temperatureRange: { min: 20, max: 35 },
        rainfallRange: { min: 300, max: 600 },
        budgetRange: { min: 5000, max: 10000 },
        soilFertility: "low",
        durationRange: { min: 70, max: 90 }
    },
    {
        name: "Jowar (Sorghum)",
        suitableSoilType: ["black", "red", "loamy"],
        seasons: ["kharif", "rabi"],
        temperatureRange: { min: 25, max: 35 },
        rainfallRange: { min: 400, max: 700 },
        budgetRange: { min: 6000, max: 12000 },
        soilFertility: "medium",
        durationRange: { min: 90, max: 120 }
    },
    {
        name: "Chickpea (Gram)",
        suitableSoilType: ["loamy", "alluvial"],
        seasons: ["rabi"],
        temperatureRange: { min: 15, max: 25 },
        rainfallRange: { min: 300, max: 500 },
        budgetRange: { min: 8000, max: 15000 },
        soilFertility: "medium",
        durationRange: { min: 90, max: 120 }
    },
    {
        name: "Groundnut",
        suitableSoilType: ["sandy", "loamy", "red"],
        seasons: ["kharif", "rabi"],
        temperatureRange: { min: 20, max: 30 },
        rainfallRange: { min: 500, max: 800 },
        budgetRange: { min: 10000, max: 18000 },
        soilFertility: "medium",
        durationRange: { min: 100, max: 140 }
    },
    {
        name: "Mustard",
        suitableSoilType: ["loamy", "alluvial"],
        seasons: ["rabi"],
        temperatureRange: { min: 10, max: 25 },
        rainfallRange: { min: 350, max: 550 },
        budgetRange: { min: 7000, max: 12000 },
        soilFertility: "medium",
        durationRange: { min: 100, max: 130 }
    },
    {
        name: "Soybean",
        suitableSoilType: ["loamy", "black"],
        seasons: ["kharif"],
        temperatureRange: { min: 20, max: 35 },
        rainfallRange: { min: 600, max: 1000 },
        budgetRange: { min: 10000, max: 16000 },
        soilFertility: "medium",
        durationRange: { min: 85, max: 115 }
    },
    {
        name: "Potato",
        suitableSoilType: ["sandy", "loamy"],
        seasons: ["rabi", "winter"],
        temperatureRange: { min: 15, max: 25 },
        rainfallRange: { min: 300, max: 600 },
        budgetRange: { min: 25000, max: 35000 },
        soilFertility: "high",
        durationRange: { min: 90, max: 120 }
    },
    {
        name: "Tomato",
        suitableSoilType: ["loamy", "black", "red"],
        seasons: ["zaid", "rabi", "kharif"],
        temperatureRange: { min: 15, max: 30 },
        rainfallRange: { min: 400, max: 700 },
        budgetRange: { min: 20000, max: 40000 },
        soilFertility: "high",
        durationRange: { min: 90, max: 130 }
    },
    {
        name: "Onion",
        suitableSoilType: ["loamy", "silty"],
        seasons: ["rabi", "kharif"],
        temperatureRange: { min: 15, max: 30 },
        rainfallRange: { min: 400, max: 750 },
        budgetRange: { min: 18000, max: 30000 },
        soilFertility: "medium",
        durationRange: { min: 120, max: 150 }
    },
    {
        name: "Sunflower",
        suitableSoilType: ["loamy", "black", "alluvial"],
        seasons: ["zaid", "kharif", "rabi"],
        temperatureRange: { min: 20, max: 28 },
        rainfallRange: { min: 300, max: 600 },
        budgetRange: { min: 8000, max: 14000 },
        soilFertility: "medium",
        durationRange: { min: 85, max: 105 }
    },
    {
        name: "Barley",
        suitableSoilType: ["sandy", "loamy"],
        seasons: ["rabi"],
        temperatureRange: { min: 10, max: 25 },
        rainfallRange: { min: 200, max: 400 },
        budgetRange: { min: 8000, max: 12000 },
        soilFertility: "low",
        durationRange: { min: 110, max: 130 }
    },
    {
        name: "Pigeon Pea (Arhar/Tur)",
        suitableSoilType: ["loamy", "alluvial", "black"],
        seasons: ["kharif"],
        temperatureRange: { min: 20, max: 35 },
        rainfallRange: { min: 500, max: 800 },
        budgetRange: { min: 7000, max: 12000 },
        soilFertility: "medium",
        durationRange: { min: 140, max: 180 }
    },
    {
        name: "Watermelon",
        suitableSoilType: ["sandy", "loamy"],
        seasons: ["zaid", "summer"],
        temperatureRange: { min: 25, max: 40 },
        rainfallRange: { min: 200, max: 500 },
        budgetRange: { min: 10000, max: 18000 },
        soilFertility: "medium",
        durationRange: { min: 75, max: 95 }
    },
    {
        name: "Turmeric",
        suitableSoilType: ["loamy", "red", "laterite"],
        seasons: ["kharif", "monsoon"],
        temperatureRange: { min: 20, max: 30 },
        rainfallRange: { min: 1000, max: 2000 },
        budgetRange: { min: 30000, max: 50000 },
        soilFertility: "high",
        durationRange: { min: 240, max: 270 }
    },
    {
        name: "Green Gram (Moong)",
        suitableSoilType: ["loamy", "sandy"],
        seasons: ["zaid", "kharif"],
        temperatureRange: { min: 25, max: 35 },
        rainfallRange: { min: 350, max: 600 },
        budgetRange: { min: 5000, max: 9000 },
        soilFertility: "medium",
        durationRange: { min: 60, max: 70 }
    }
];
