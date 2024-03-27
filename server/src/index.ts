import dotenv from "dotenv";
import express, { json } from "express";
import logs from "./utils/logs";
import path from "path";
import mongoDBConnection from "./databases/mongodb/connection";
import { filterClientFiles } from "./utils/filtering-client-files";

dotenv.config();
export const rootPath = path.join(__dirname);
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(json());
app.use(logs);

// Api routes
app.use("/api/v1/", () => {});

// Serve static files
app.use(filterClientFiles);
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle requests to non-existing paths
app.use("/:any", express.static(path.join(__dirname, "public", "404")));

mongoDBConnection().then((result) => {
  if (result.error) return console.error(result.message);

  app.listen(port, () => {
    console.info(`✔ server is running on port ${port}\n\n${result.message}\n\n`);
  });
});
