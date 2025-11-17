import { Router } from "express";
import { getAlbumbyId, getAllAlbums } from "../controller/album.controller.js";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js"

const router = Router();

router.get("/", protectRoute, requiredAdmin, getAllAlbums);
router.get("/:albumId", getAlbumbyId);

export default router;