import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trends, updateVideo } from "../controllers/video.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);

//when we visit the video page will incriment the views of that video by one
router.put("/view/:videoId", addView);

router.get("/trend", trends);
router.get("/random", random);

router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);


export default router;