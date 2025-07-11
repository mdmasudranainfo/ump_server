import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorlogger, logger } from "./shared/logger";
import { Server } from "http";

const port = config.port;

process.on("uncaughtException", (err) => {
  errorlogger.error("Uncaught Exception: ", err);
  process.exit(1);
});

async function main() {
  let server: Server;
  try {
    await mongoose.connect(`${config.mongodb_uri}`);
    logger.info("🎈🎈 Connected to MongoDB successfully");

    server = app.listen(port, () => {
      logger.info(`app listening on port ${port}`);
    });
  } catch (err) {
    errorlogger.error(`Failed to connect to the database: ${err}`);
    process.exit(1);
  }

  process.on("unhandledRejection", (err) => {
    if (server) {
      server.close(() => {
        errorlogger.error(`Unhandled Rejection: ${err}`);
        process.exit(1);
      });
    } else {
      errorlogger.error(`Unhandled Rejection without server: ${err}`);
      process.exit(1);
    }
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Shutting down gracefully...");
    if (server) {
      server.close(() => {
        logger.info("Server closed due to SIGTERM.");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
}

main();
