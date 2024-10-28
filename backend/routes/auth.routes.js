import express from "express";
import { login, logout, signup, getUserById, updateProfile, deleteUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", getUserById);
router.post("/updateProfile", updateProfile);
router.delete("/deleteUser", deleteUser);


export default router;
