import { Request, Response } from "express";
import { db } from "../../../infraestructure/firebase/firebase";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const deleteTaskUseCase = async (req: Request, res: Response) => {
  const { uid } = req as ExtendedRequest;
  const { id } = req.params;

  if (!uid) return res.status(401).json({ error: "Unauthorized" });

  try {
    const taskRef = db.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists || taskDoc.data()?.uid !== uid) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await taskRef.delete();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
