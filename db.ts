import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.DB_URL as string);
let database: ReturnType<MongoClient["db"]>;

export const initDatabase = async () => {
  if (!database) {
    await client.connect(); // Connect once at application startup
    database = client.db("Spotify_As_Microservice");
    console.log("Connected to MongoDB");
  }
  return database;
};
