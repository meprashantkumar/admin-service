import { Request } from "express";
import TryCatch from "./TryCatch.js";
import { Album } from "./models/Album.js";
import getBuffer from "./bufferGenerator.js";
import cloudinary from "cloudinary";
import { Song } from "./models/Song.js";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const addAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "You are not admin",
    });
    return;
  }

  const { title, description } = req.body;

  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: "No file provided",
    });
    return;
  }

  // Generate the Data URI
  const fileUrl = getBuffer(file);

  if (!fileUrl || !fileUrl.content) {
    res.status(500).json({
      message: "Failed to generate file buffer",
    });
    return;
  }

  // Upload Data URI to Cloudinary
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    folder: "albums",
  });

  await Album.create({
    title,
    description,
    thumbnail: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.json({
    message: "Album created successfully",
  });
});

export const addSong = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "You are not admin",
    });
    return;
  }

  const { title, description, singer, album } = req.body;

  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: "No file provided",
    });
    return;
  }

  // Generate the Data URI
  const fileUrl = getBuffer(file);

  if (!fileUrl || !fileUrl.content) {
    res.status(500).json({
      message: "Failed to generate file buffer",
    });
    return;
  }

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
    resource_type: "video",
    folder: "songs",
  });

  await Song.create({
    title,
    description,
    singer,
    audio: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    album,
  });

  res.json({
    message: "Song Added",
  });
});

export const addThumbnail = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "You are not admin",
    });
    return;
  }

  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: "No file provided",
    });
    return;
  }

  // Generate the Data URI
  const fileUrl = getBuffer(file);

  if (!fileUrl || !fileUrl.content) {
    res.status(500).json({
      message: "Failed to generate file buffer",
    });
    return;
  }

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Song.findByIdAndUpdate(
    req.params.id,
    {
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    },
    { new: true }
  );

  res.json({
    message: "thumbnail Added",
  });
});

export const deleteSong = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "You are not admin",
    });
    return;
  }

  const song = await Song.findById(req.params.id);

  if (!song) {
    res.status(404).json({
      message: "No song with this id",
    });
    return;
  }

  await song.deleteOne();

  res.json({ message: "Song Deleted" });
});
