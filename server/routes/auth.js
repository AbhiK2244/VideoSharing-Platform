import express from "express";
import {signup, signin, googleAuth, logout } from "../controllers/auth.js";
 


const router = express.Router();

//create a user
router.post("/signup", signup)

//sign-in 
router.post("/signin", signin)

//logout
router.get("/logout", logout)

//google auth
router.post("/google", googleAuth)

export default router;