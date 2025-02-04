import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the Album document
export interface IAlbum extends Document {
  title: string;
  description: string;
  thumbnail: {
    id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Album model
const albumSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Album model with the IAlbum interface
export const Album: Model<IAlbum> = mongoose.model<IAlbum>(
  "Album",
  albumSchema
);
