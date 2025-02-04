import express from "express";
import { isAuth } from "./isAuth.js";
import { addAlbum, addSong, addThumbnail, deleteSong } from "./controller.js";
import uploadFile from "./multer.js";

const router = express.Router();

router.post("/admin/add/album", isAuth, uploadFile, addAlbum);
router.post("/admin/add/song", isAuth, uploadFile, addSong);
router.put("/admin/song/:id", isAuth, uploadFile, addThumbnail);
router.delete("/admin/song/:id", isAuth, deleteSong);

export default router;
