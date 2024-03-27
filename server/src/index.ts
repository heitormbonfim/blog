import dotenv from "dotenv";
import express, { Response, json } from "express";
import logs from "./utils/logs";
import path from "path";
import mongoDBConnection from "./databases/mongodb/connection";
import { filterClientFiles } from "./utils/filter-client-files";
import authRouter from "./modules/auth/routes";

dotenv.config();
export const rootPath = path.join(__dirname);
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(json());
app.use(logs);

// Api routes
app.use("/v1/test", (_, res: Response) => {
  res.status(200).json({ error: false, message: "API Version 1 is working" });
});
app.use("/v1/", authRouter);

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
