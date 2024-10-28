import BidTable from '../models/bidTable.model.js';
import jwt from 'jsonwebtoken';

// Create a new bid
export const createBid = async (req, res) => {
  try {
    const { bidName, bidImage, initialBid, maximumBid, minBidAmount, daysToExpire } = req.body; // Include daysToExpire in destructuring
    
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const bidOwnerId = decoded.userId;

    const currentDate = new Date();
    const expireTime = new Date(currentDate.setDate(currentDate.getDate() + daysToExpire)); // Calculate expire time based on daysToExpire

    const newBid = new BidTable({
      bidOwnerId,
      bidName,
      bidImage,
      initialBid,
      maximumBid,
      minBidAmount,
      currentBid: initialBid,
      expireTime: expireTime.toISOString(), // Ensure it is stored as an ISO string
      onGoing: true,
    });

    await newBid.save();
    res.status(201).json({ message: "Bid created successfully", bid: newBid });
  } catch (error) {
    console.error("Error in createBid controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Place a bid
export const placeBid = async (req, res) => {
  try {
    const { bidId, bidAmount } = req.body;
    
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const bid = await BidTable.findById(bidId);
    if (!bid) {
      return res.status(404).json({ error: "Bid not found" });
    }

    // Check if the bid is still ongoing
    const currentTime = new Date();
    if (bid.expireTime < currentTime) {
      // Update bid to not ongoing
      bid.onGoing = false;
      await bid.save();
      return res.status(400).json({ error: "Bid has expired" });
    }

    if (bidAmount <= bid.currentBid || bidAmount < bid.currentBid + bid.minBidAmount) {
      return res.status(400).json({ error: `Bid must be at least ${bid.currentBid + bid.minBidAmount}` });
    }

    if (bidAmount > bid.maximumBid) {
      return res.status(400).json({ error: "Bid exceeds maximum allowed bid" });
    }

    bid.currentBid = bidAmount;
    bid.currentBidUserId = userId;
    await bid.save();

    res.status(200).json({ message: "Bid placed successfully", bid });
  } catch (error) {
    console.error("Error in placeBid controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOngoingBids = async (req, res) => {
  try {
    const ongoingBids = await BidTable.find({ onGoing: true, bidVerified: true });

    if (ongoingBids.length === 0) {
      return res.status(404).json({ message: "No ongoing bids found" });
    }

    res.status(200).json({ message: "All ongoing bids fetched successfully", bids: ongoingBids });
  } catch (error) {
    console.error("Error in getAllOngoingBids controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

