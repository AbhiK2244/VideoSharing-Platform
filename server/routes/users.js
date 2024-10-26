import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, undislike, unlike, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update)

//delete user
router.delete("/:id", verifyToken, deleteUser)

//get a user
router.get("/find/:id", getUser)

//subscribe a user. here :id is channel id
router.put("/sub/:id", verifyToken, subscribe)

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe)

//like a video
router.put("/like/:videoId", verifyToken, like)

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)

//unlike a video
router.put("/unlike/:videoId", verifyToken, unlike)

//undislike a video
router.put("/undislike/:videoId", verifyToken, undislike)


export default router;