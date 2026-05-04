import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "./models/Event.js";

dotenv.config();

async function run() {
  try {
    const mongoUrl =
      process.env.MONGODB_URL ||
      process.env.MONGO_URI ||
      process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGODB_URL not set in .env");
    }

    await mongoose.connect(mongoUrl, {
      dbName: process.env.MONGODB_DB || "eventease",
    });

    console.log("Connected to Mongo. Seeding...");

    const demo = {
      title: "Demo Launch Party",
      description: "A sample demo event created by seed script.",
      date: "Dec 15",
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 120),
      location: "Virtual - Zoom",
      tickets: [
        { name: "General Admission", priceCents: 5000, quantity: 100 },
        { name: "VIP", priceCents: 15000, quantity: 20 },
      ],
    };

    await Event.deleteMany({ title: demo.title });

    const created = await Event.create(demo);
    console.log("Seeded event:", created._id);
    await mongoose.disconnect();
    console.log("Done.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

run();
