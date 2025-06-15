import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "../../domain/interfaces";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.RANDOM_KEY || "") as IPayload;

    (req as ExtendedRequest).uid = payload.uid;

    return next(); //
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
};
