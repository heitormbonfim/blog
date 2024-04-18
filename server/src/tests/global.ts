import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const url = `http://localhost:${port}/v1`;
