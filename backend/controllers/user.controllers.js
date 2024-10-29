import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import generateTokenAndSetCookie from "../utils/genarateTokens.js";
import { sendVerificationEmail } from "../nodemailer/email.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender, email } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URL based on gender
        const profilePic = gender === "male" 
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Generate verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            verificationToken,
            profilePic,
        });

        // Save the user and generate token
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Validate user
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Validate password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate token
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            userId: user.username,
            fullName: user.fullName,
            email: user.email || "",
            profilePicture: user.profilePic,
            gender: user.gender,
            verified: user.verified,
            currentAmount: parseFloat(user.currentAmount),
            rareCollections: user.rareCollections.reduce((acc, { name, url }) => {
                acc[name] = url;
                return acc;
            }, {}),
        });
    } catch (error) {
        console.error("Error in getUserById controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Validate updates
        const updates = req.body;
        const allowedUpdates = ["fullName", "username", "gender", "profilePic", "currentAmount", "rareCollections"];
        const isValidOperation = Object.keys(updates).every((key) => allowedUpdates.includes(key));

        if (!isValidOperation) {
            return res.status(400).json({ error: "Invalid updates!" });
        }

        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            userId: user.username,
            fullName: user.fullName,
            email: user.email || "",
            profilePicture: user.profilePic,
            gender: user.gender,
            verified: user.verified,
            currentAmount: parseFloat(user.currentAmount),
            rareCollections: user.rareCollections.reduce((acc, { name, url }) => {
                acc[name] = url;
                return acc;
            }, {}),
        });
    } catch (error) {
        console.error("Error in updateProfile controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getVerifyEmail = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.email || !user.verificationToken) {
            return res.status(400).json({ error: "User email or verification token is not defined" });
        }

        await sendVerificationEmail(user.email, user.verificationToken);
        res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error) {
        console.error("Error in getVerifyEmail controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
