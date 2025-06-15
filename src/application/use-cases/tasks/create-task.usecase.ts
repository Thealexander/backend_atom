import { Request, Response } from "express";
import { db, admin } from "../../../infraestructure/firebase/firebase";
import { ITask } from "../../../domain/interfaces";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const createTaskUseCase = async (req: Request, res: Response) => {
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;
  const { uid } = req as ExtendedRequest;

  if (!uid) return res.status(401).json({ error: "Unauthorized" });
  if (
    !title ||
    !description ||
    !status ||
    !priority ||
    !dueDate ||
    !assignedTo
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newTask: ITask = {
      uid: assignedTo,
      title,
      description,
      status,
      priority,
      dueDate,
      completed: status === "completed",
      createdAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection("tasks").add(newTask);

    return res.status(201).json({
      _id: docRef.id,
      ...newTask,
      assignedTo,
      createdAt: newTask.createdAt.toDate().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
