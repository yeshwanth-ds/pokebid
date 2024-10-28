import express from "express";

import { createAdminMember } from "../controllers/admin.controllers.js";

const router = express.Router();

router.post("/createAdmin", createAdminMember);


export default router;