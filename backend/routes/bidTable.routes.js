import express from 'express';
import { createBid, getAllOngoingBids, placeBid } from '../controllers/bidTable.controllers.js';

const router = express.Router();

// Route to create a bid
router.post('/createBid', createBid);

// Route to place a bid
router.post('/placeBid/:id', placeBid);

router.get('/onGoingBids', getAllOngoingBids);

export default router;
