import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the Song document
export interface ISong extends Document {
  title: string;
  description: string;
  singer: string;
  thumbnail: {
    id: string;
    url: string;
  };
  audio: {
    id: string;
    url: string;
  };
  album: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Song model
const songSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
    thumbnail: {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    audio: {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    album: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Song model with the ISong interface
export const Song: Model<ISong> = mongoose.model<ISong>("Song", songSchema);
