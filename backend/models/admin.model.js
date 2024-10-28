import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String, 
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true }
);


const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
