import express from 'express';
import { createBid, placeBid } from '../controllers/bidTable.controllers.js';

const router = express.Router();

// Route to create a bid
router.post('/createBid', createBid);

// Route to place a bid
router.post('/placeBid', placeBid);

export default router;
