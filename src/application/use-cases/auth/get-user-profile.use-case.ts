import { Request, Response } from "express";
import { db } from "../../../infraestructure/firebase/firebase";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const getUserProfileUseCase = async (req: Request, res: Response) => {
  const { uid } = req as ExtendedRequest;

  if (!uid) return res.status(401).json({ error: "UID not found in token" });

  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user: userDoc.data() });
  } catch (error: any) {
    console.error("Error getting user profile:", error);
    return res.status(500).json({ error: error.message });
  }
};
