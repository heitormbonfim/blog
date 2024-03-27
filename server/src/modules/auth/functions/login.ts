import { Request, Response } from "express";
import { validateEmail } from "../../../utils/email-verifcation";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: LoginCredentials = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Email format not valid",
      });
    }

    res.status(200).json({
      error: false,
      message: "Successfully logged in",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server Error",
    });
    console.error(error);
  }
}
