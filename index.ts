import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./route.js";
import cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT;

const connectDb = async () => {
  try {
    mongoose.connect(process.env.DB_URL as string, {
      dbName: "Spotify_As_Microservice",
    });
    console.log("Mongo Db Connected");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/v1", adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
