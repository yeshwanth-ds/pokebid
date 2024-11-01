import Admin from "../models/admin.model.js";
import BidTable from "../models/bidTable.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/genarateTokens.js";

// Create a new admin member
export const createAdminMember = async (req, res) => {
    try {
        const { userEmail, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Check if user email already exists
        const existingUser = await Admin.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            userEmail,
            password: hashedPassword,
        });

        // Save the user and generate token
        await newAdmin.save();

        generateTokenAndSetCookie(newAdmin._id, res);

        res.status(201).json({
            message: "Admin user created successfully",
            admin: { id: newAdmin._id, userEmail: newAdmin.userEmail },
        });
    } catch (error) {
        console.error("Error in createAdminMember controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Admin login
export const adminLogin = async (req, res) => {
    try {
        const { userEmail, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ userEmail });
        if (!admin) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(admin._id, res);

        res.status(200).json({
            message: "Admin logged in successfully",
            admin: { id: admin._id, userEmail: admin.userEmail },
        });
    } catch (error) {
        console.error("Error in adminLogin controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Admin logout
export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("jwt"); // Clear the JWT token cookie
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        console.error("Error in adminLogout controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllBids = async (req, res) => {
    try {
        const bids = await BidTable.find();
        res.status(200).json({
            message: "All bids fetched successfully",
            bids,
        });
    } catch (error) {
        console.error("Error in getAllBids controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch all verified bids from the BidTable
export const getAllVerifiedBids = async (req, res) => {
    try {
        const verifiedBids = await BidTable.find({ bidVerified: true });
        res.status(200).json({
            message: "All verified bids fetched successfully",
            bids: verifiedBids,
        });
    } catch (error) {
        console.error("Error in getAllVerifiedBids controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch all unverified bids from the BidTable
export const getAllUnverifiedBids = async (req, res) => {
    try {
        const unverifiedBids = await BidTable.find({ bidVerified: false });
        res.status(200).json({
            message: "All unverified bids fetched successfully",
            bids: unverifiedBids,
        });
    } catch (error) {
        console.error("Error in getAllUnverifiedBids controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const toVerifyBid = async (req, res) => {
    const { id: bidId } = req.params;

    try {
        const bid = await BidTable.findById(bidId);
        if (!bid) {
            return res.status(404).json({ error: "Bid not found" });
        }

        bid.bidVerified = true;
        await bid.save();

        res.status(200).json({
            message: "Bid verified successfully",
            bid: bid, // sending the verified bid as part of the response
        });
    } catch (error) {
        console.error("Error in toVerifyBid controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
