import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URL ||
    process.env.MONGO_URI ||
    process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("Missing MongoDB connection string in .env");
  }

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || "eventease",
  });
};
