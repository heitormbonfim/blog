import express, { json } from "express";
import { logs } from "./utils/logs";
import path from "path";
const app = express();
const port = process.env.PORT || 5001;
// middlewares
app.use(json());
app.use(logs);
// api routes
app.use("/api/v1/", () => { });
// serve static files
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(port, () => console.info(`✔ server is running on port ${port}\n\n`));
