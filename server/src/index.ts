import dotenv from "dotenv";
import express, { Response, json } from "express";
import logs from "./utils/logs";
import { join } from "path";
import mongoDBConnection from "./databases/mongodb/connection";
import authRouter from "./modules/auth/routes";
import cors from "cors";
import blogRouter from "./modules/blog/routes";
import postRouter from "./modules/posts/route";

dotenv.config();

export const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(json());
app.use(logs);

// Api routes
app.use("/v1/test", function (_, res: Response) {
  res.status(200).json({ error: false, message: "API Version 1 is working" });
});
app.use("/v1/", authRouter);
app.use("/v1/blog/", blogRouter);
app.use("/v1/blog/", postRouter);

// Serve static files
export const staticFilesPath = join(__dirname, "public", "index.html");
app.use(express.static(join(__dirname, "public")));
app.get("*", (_, res) => res.sendFile(staticFilesPath));

// Start server
mongoDBConnection().then((result) => {
  if (result.error) return console.error(result.message);

  app.listen(port, () => {
    console.info(`✔ server is running on port ${port}\n\n${result.message}\n\n`);
  });
});
