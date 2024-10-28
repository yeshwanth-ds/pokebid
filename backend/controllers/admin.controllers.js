import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/genarateTokens.js";

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
