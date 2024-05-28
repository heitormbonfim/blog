import express from "express";

const commentRouter = express.Router();

// get requests
commentRouter.get("/test", (_, res) => {
  console.log("herrroooo");
  res.status(200).json({ message: "hey" });
});

export default commentRouter;
