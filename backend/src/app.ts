import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import sitterRoutes from "./routes/sitterRoutes.js";
import careRequestRoutes from "./routes/careRequestRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/sitters", sitterRoutes);

app.use("/api/care-requests", careRequestRoutes);

app.use("/api/conversations", conversationRoutes);

app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("AuPlant API is running 🌱!");
});

export default app;
