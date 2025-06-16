import expressAsyncHandler from "express-async-handler";
import Users from "../../schema/user/user.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const checkUserExists = await Users.findOne({ email });
    if (checkUserExists) {
      res.status(400).send({ result: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      email,
      password: hashedPassword,
    });

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const authToken = await jwt.sign(
      {
        email: user?.email,
        id: user?._id
      },
      jwtSecretKey,
      { expiresIn: "1d" },
    );

    if (authToken) {
      res.status(200).send({ result: 'User created successfully', token: authToken });
    }

  } catch (error) {
    res.status(500).send({ result: 'Something went wrong. Failed to create new user' });
  }
}

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const checkIfUserExists = await Users.findOne({ email: email })

    if (!checkIfUserExists) {
      res.status(400).send({ result: 'email does not exist' });
      return;
    }

    const verifyPassword = await bcrypt.compare(
      password,
      checkIfUserExists?.password,
    );

    if (!verifyPassword) {
      res.status(400).send({ result: 'Incorrect password' });
      return;
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const authToken = await jwt.sign(
      {
        email: checkIfUserExists?.email,
        id: checkIfUserExists?._id
      },
      jwtSecretKey,
      { expiresIn: "1d" },
    );

    if (authToken) {
      res.status(200).send({ result: "Welcome back", token: authToken });
      return;
    }
  }
  catch (error) {
    res.status(500).send({ result: 'Something went wrong. Failed to log in' });
  }
}

