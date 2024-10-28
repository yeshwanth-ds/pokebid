import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import generateTokenAndSetCookie from "../utils/genarateTokens.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getUserById = async (req, res) => {
    try {
        // Get JWT token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ status: "error", message: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Fetch user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Respond with user data
        res.status(200).json({
            status: "success",
            data: {
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
            },
        });
    } catch (error) {
        console.error("Error in getUserById controller:", error.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        // Get JWT token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ status: "error", message: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find and update user profile
        const updates = req.body;
        const allowedUpdates = ["fullName", "username", "gender", "profilePic", "currentAmount", "rareCollections"];
        const isValidOperation = Object.keys(updates).every((key) => allowedUpdates.includes(key));

        if (!isValidOperation) {
            return res.status(400).json({ status: "error", message: "Invalid updates!" });
        }

        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Respond with updated user data
        res.status(200).json({
            status: "success",
            data: {
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
            },
        });
    } catch (error) {
        console.error("Error in updateProfile controller:", error.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        // Get JWT token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Delete the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with a success message
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};