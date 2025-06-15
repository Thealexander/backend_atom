import { Request, Response } from "express";
import { db } from "../../../infraestructure/firebase/firebase";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const updateUserProfileUseCase = async (req: Request, res: Response) => {
  const { name, lastname } = req.body;
  const { uid } = req as ExtendedRequest;

  if (!uid || !name || !lastname) {
    return res
      .status(400)
      .json({ error: "UID, name, and lastname are required" });
  }

  try {
    const userRef = db.collection("users").doc(uid);
    await userRef.update({ name, lastname });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: error.message });
  }
};
