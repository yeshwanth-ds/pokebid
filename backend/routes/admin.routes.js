import express from "express";

import { adminLogin, adminLogout, createAdminMember, getAllBids, getAllUnverifiedBids, getAllVerifiedBids } from "../controllers/admin.controllers.js";
import protectAdminRoute from "../middleware/protectAdminRoute.js";

const router = express.Router();

router.post("/createAdmin", createAdminMember);

router.post("/login", adminLogin);

router.post("/logout", adminLogout);

router.get("/bids", protectAdminRoute, getAllBids);

router.get("/bids/verified", protectAdminRoute, getAllVerifiedBids);

router.get("/bids/unverified", protectAdminRoute, getAllUnverifiedBids);


export default router;