import { Request, Response } from "express";
import validateEmail from "../../../utils/email-verifcation";
import {
  createNewUser,
  findUserByEmail,
} from "../../../databases/mongodb/functions/user/queries";
import { hashString } from "../../../utils/bcrypt-functions";

export interface RegistrationCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export async function register(req: Request, res: Response) {
  try {
    const {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    }: RegistrationCredentials = req.body;

    if (!email || !firstName || !lastName! || !password) {
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

    const userExists = await findUserByEmail(email);

    if (userExists) {
      return res.status(200).json({
        error: true,
        message: "User already exists",
      });
    }

    const hashedPassword = hashString(password);

    const user = await createNewUser({
      email,
      name: {
        first: firstName,
        last: lastName,
      },
      password: hashedPassword,
      role: "user",
    });

    if (!user) {
      throw Error("Error on creating user\n");
    }

    res.status(201).json({
      error: false,
      message: "Successfully registered",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });

    console.error(error);
  }
}
