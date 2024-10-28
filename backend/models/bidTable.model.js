import mongoose from "mongoose";

const bidTableSchema = new mongoose.Schema({
  bidOwnerId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference another user document if needed
    required: true,
    ref: 'User', // Reference to a user model if bidOwnerId is related to users
  },
  bidName: {
    type: String,
    required: true,
    trim: true,
  },
  bidImage: {
    type: String,
    required: false, // Optional field if not all bids have images
  },
  bidVerified: {
    type: Boolean,
    default: false, 
  },
  initialBid: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  maximumBid: {
    type: Number,
    required: true,
    min: 0,
  },
  minBidAmount: {
    type: Number,
    required: true,
    min: 1, // Minimum increment amount to bid
  },
  currentBid: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  currentBidUserId: {
    type: mongoose.Schema.Types.ObjectId, // Optional ObjectId referencing the user with the current highest bid
    ref: 'User',
    required: false,
  },
  expireTime: {
    type: Date,
    required: true,
  },
  onGoing: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const BidTable = mongoose.model('BidTable', bidTableSchema);


export default BidTable;
