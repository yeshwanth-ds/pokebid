import express from "express";
import { login, logout, signup, getUserById, updateProfile, deleteUser, getVerifyEmail } from "../controllers/user.controllers.js";


const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile", getUserById);
router.post("/updateProfile", updateProfile);
router.delete("/deleteUser", deleteUser);
router.post("/verify-email",getVerifyEmail);


export default router;
