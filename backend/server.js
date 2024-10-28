import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user.routes.js";
import bidRoutes from "./routes/bidTable.routes.js";
import connectToMongoose from "./db/connectMongoDB.js";


const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", authRoutes);
app.use("/api", bidRoutes);

app.listen(PORT, () => {
    connectToMongoose();
    console.log(`Server running in port ${PORT}`);
});