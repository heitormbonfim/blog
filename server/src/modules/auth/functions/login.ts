import { Request, Response } from "express";
import validateEmail from "../../../utils/email-verifcation";
import { findUserByEmail } from "../../../databases/mongodb/functions/user/queries";
import { compareHash } from "../../../utils/bcrypt-functions";
import jwt from "jsonwebtoken";
import { defaultServerError } from "../../../utils/server-errors";

interface LoginCredentials {
  email: string;
  password: string;
}

interface EssentialUserData {
  _id: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
}

const secret = process.env.JWT_SECRET || "no-secret";

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

    const validPassword = compareHash(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        error: true,
        message: errorMessage,
      });
    }

    const essencialData: EssentialUserData = {
      _id: user.id,
      email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(essencialData, secret, { expiresIn: "90d" });

    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      data: { ...essencialData, token },
    });
  } catch (error) {
    defaultServerError(res, error);
  }
}

export async function loginWithToken(req: Request, res: Response) {
  try {
    const token = req.header("auth");

    if (!token) {
      return res.status(403).json({
        error: true,
        message: "Missing token",
      });
    }

    jwt.verify(token, secret, async function (error: jwt.VerifyErrors | null, data: any) {
      if (error) {
        return res.status(403).json({
          error: true,
          message: "Token Expired",
        });
      }

      const { email } = data as EssentialUserData;

      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(400).json({
          error: true,
          message: "Invalid Token",
        });
      }

      return res.status(200).json({
        error: false,
        message: "Valid Token",
        data,
      });
    });
  } catch (error) {
    defaultServerError(res, error);
  }
}
