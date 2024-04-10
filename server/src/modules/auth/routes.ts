import express from "express";
import { login, loginWithToken } from "./functions/login";
import { register } from "./functions/register";

const authRouter = express.Router();

// get requests
authRouter.get("/login", loginWithToken);

// post requests
authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
