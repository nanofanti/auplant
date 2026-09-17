import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sitterRoutes from "./routes/sitterRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/sitters", sitterRoutes);

app.get("/", (req, res) => {
  res.send("AuPlant API is running 🌱!");
});

export default app;
