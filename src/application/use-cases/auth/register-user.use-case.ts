import { Request, Response } from "express";
import { db, auth } from "../../../infraestructure/firebase/firebase";
import { IUser, IPayload } from "../../../domain/interfaces";
import jwt from "jsonwebtoken";

export const registerUserUseCase = async (req: Request, res: Response) => {
  const { email, name, lastname } = req.body;

  try {
    const userRecord = await auth.createUser({ email });

    const userData: IUser = {
      uid: userRecord.uid,
      email: userRecord.email || "",
      name,
      lastname,
    };

    await db.collection("users").doc(userRecord.uid).set(userData);

    const payload: IPayload = {
      uid: userData.uid,
      email: userData.email,
      name: userData.name,
      lastName: userData.lastname,
    };

    const token = jwt.sign(payload, process.env.RANDOM_KEY || "", {
      expiresIn: "7d",
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: userData, token });
  } catch (error: any) {
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "Email is already registered" });
    }
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
