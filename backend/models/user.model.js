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
      email: {
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
      verificationToken: {
        type: String,
        default: "",
      },
      rareCollections: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      recentBids: [
        {
          bidId: { type: mongoose.Schema.Types.ObjectId, ref: "BidTable", required: true },
          amount: { type: Number, required: true },
          timestamp: { type: Date, default: Date.now },
        },
      ],
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  
  export default User;
  