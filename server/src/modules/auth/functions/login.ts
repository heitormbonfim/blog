import { Request, Response } from "express";
import validateEmail from "../../../utils/email-verifcation";
import { findUserByEmail } from "../../../databases/mongodb/functions/user/queries";
import { compareHash } from "../../../utils/bcrypt-functions";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: LoginCredentials = req.body;

    const errorMessage = "Invalid credentials";

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: errorMessage,
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Email format not valid",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        error: true,
        message: errorMessage,
      });
    }

    console.log({ password, hash: user.password });

    const validPassword = compareHash(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        error: true,
        message: errorMessage,
      });
    }

    const data = {
      email,
      name: user.name,
      role: user.role,
    };

    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Server Error",
    });
    console.error(error);
  }
}
