import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { createApp } from "./app";
import { logger } from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    const app = createApp();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    logger.error(`❌ Server startup failed: ${err.message}`);
    process.exit(1);
  }
})();
