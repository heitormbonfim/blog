import { Request, Response } from "express";
import validateEmail from "../../../utils/email-verifcation";
import { createNewUser, findUserByEmail } from "../../../databases/mongodb/functions/user/queries";
import { hashString } from "../../../utils/bcrypt-functions";
import { setNameFormat } from "../../../utils/strings-manipulation";
import { defaultServerError } from "../../../utils/server-errors";

export interface RegistrationCredentials {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export async function register(req: Request, res: Response) {
  try {
    const { email, name, password }: RegistrationCredentials = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    name.first = setNameFormat(name.first);
    name.last = setNameFormat(name.last);

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
      name,
      password: hashedPassword,
      role: "user",
    });

    if (!user) {
      throw Error("Error on creating user\n");
    }

    res.status(201).json({
      error: false,
      message: "Successfully registered",
    });
  } catch (error) {
    defaultServerError(res, error);
  }
}
