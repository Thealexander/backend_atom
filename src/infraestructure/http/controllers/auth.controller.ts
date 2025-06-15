import { Request, Response } from "express";
import {
  registerUserUseCase,
  signInUserUseCase,
  getUserProfileUseCase,
  updateUserProfileUseCase,
} from "../../../application/use-cases";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, lastname } = req.body;

    if (!email || !name || !lastname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await registerUserUseCase(req, res);
    return result;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await signInUserUseCase(req, res);
    return result;
  } catch (error: any) {
    console.error("Error during sign in:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    //
    return await getUserProfileUseCase(req, res);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    if (req.method === "GET") {
      return await getUserProfileUseCase(req, res);
    }

    if (req.method === "PUT") {
      return await updateUserProfileUseCase(req, res);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in profile handler:", error);
    return res.status(500).json({ error: error.message });
  }
};
