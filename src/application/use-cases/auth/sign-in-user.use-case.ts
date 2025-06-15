import { Request, Response } from "express";
import { db, auth } from "../../../infraestructure/firebase/firebase";
import { IPayload } from "../../../domain/interfaces";
import jwt from "jsonwebtoken";

export const signInUserUseCase = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userRecord = await auth.getUserByEmail(email);
    const userDoc = await db.collection("users").doc(userRecord.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const userData = userDoc.data();

    const payload: IPayload = {
      uid: userRecord.uid,
      email: userRecord.email!,
      name: userData?.name,
      lastName: userData?.lastname,
    };

    const token = jwt.sign(payload, process.env.RANDOM_KEY || "", {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "User signed in successfully",
      user: userData,
      token,
    });
  } catch (error: any) {
    console.error("Error during sign in:", error);
    return res.status(500).json({ error: error.message });
  }
};
