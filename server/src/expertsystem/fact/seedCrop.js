import dotenv from "dotenv";
import { connect } from "../../config/dbConnection.js";
import { Crop } from "../../models/crop.model.js";
import { crops } from "./cropData.js";

dotenv.config();

const seedCrops = async () => {
    try {
        await connect(); // 🔑 THIS WAS MISSING

        await Crop.deleteMany();
        await Crop.insertMany(crops);

        console.log("✅ Crops seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed", error);
        process.exit(1);
    }
};

seedCrops();
