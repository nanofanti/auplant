import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("AuPlant API is running 🌱!");
});

export default app;
