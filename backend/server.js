import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";  // Import cors
import authRoutes from "./routes/user.routes.js";
import bidRoutes from "./routes/bidTable.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectToMongoose from "./db/connectMongoDB.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  // Allow cookies if needed
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", bidRoutes);

// Start server
app.listen(PORT, () => {
  connectToMongoose();
  console.log(`Server running on port ${PORT}`);
});
