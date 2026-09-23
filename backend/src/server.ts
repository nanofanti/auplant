import "dotenv/config";

import app from "./app.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
