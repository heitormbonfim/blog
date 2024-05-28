import dotenv from "dotenv";
import express, { json } from "express";
import logs from "./utils/logs";
import { join } from "path";
import mongoDBConnection from "./databases/mongodb/connection";
import authRouter from "./modules/auth/routes";
import cors from "cors";
import blogRouter from "./modules/blog/routes";
import postRouter from "./modules/posts/route";
import filesRouter from "./modules/files/route";
import { checkIfApiIsAlive } from "./utils/check-api";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(json());
app.use(logs);

// Api routes
app.use("/v1/hello", checkIfApiIsAlive);
app.use("/v1/", authRouter);
app.use("/v1/blog", blogRouter);
app.use("/v1/post", postRouter);
app.use("/v1/files", filesRouter);

// Serve static files
export const staticFilesPath = join(__dirname, "public", "index.html");
app.use(express.static(join(__dirname, "public")));
app.get("*", (_, res) => res.sendFile(staticFilesPath));

// Start server
const port = process.env.PORT || 5000;

mongoDBConnection().then((result) => {
  if (result.error) return console.error(result.message);

  app.listen(port, () => {
    console.info(`# server is running on port ${port}\n\n${result.message}\n\n`);
  });
});
