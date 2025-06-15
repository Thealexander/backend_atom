import { Request, Response } from "express";
import { db, admin } from "../../../infraestructure/firebase/firebase";
import { ITask } from "../../../domain/interfaces";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const updateTaskUseCase = async (req: Request, res: Response) => {
  const { uid } = req as ExtendedRequest;
  const { id } = req.params;

  if (!uid) return res.status(401).json({ error: "Unauthorized" });

  try {
    const taskRef = db.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists || taskDoc.data()?.uid !== uid) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await taskRef.update({
      ...req.body,
      updatedAt: admin.firestore.Timestamp.now(),
    });
    const updatedDoc = await taskRef.get();
    const updatedTask = updatedDoc.data() as ITask;

    return res.status(200).json({
      _id: id,
      ...updatedTask,
      assignedTo: updatedTask.uid,
      createdAt: updatedTask.createdAt.toDate().toISOString(),
      updatedAt: updatedTask.updatedAt?.toDate().toISOString() || null,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
