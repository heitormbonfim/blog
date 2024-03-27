import express from "express";
import { login } from "./functions/login";
import { register } from "./functions/register";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
