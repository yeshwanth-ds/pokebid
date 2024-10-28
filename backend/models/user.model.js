import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		verified: {
			type: Boolean,
			default: false,
		},
		currentAmount: {
			type: Number, // Updated to Number type for consistency
			default: 1000,
		},
		rareCollections: [
			{
				name: { type: String, required: true },
				url: { type: String, required: true },
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
