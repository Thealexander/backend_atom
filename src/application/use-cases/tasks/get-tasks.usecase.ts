import { Request, Response } from "express";
import { db } from "../../../infraestructure/firebase/firebase";
import { ITask } from "../../../domain/interfaces";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const getTasksUseCase = async (req: Request, res: Response) => {
  const { uid } = req as ExtendedRequest;

  if (!uid) return res.status(401).json({ error: "Unauthorized" });

  try {
    const snapshot = await db.collection("tasks").where("uid", "==", uid).get();
    const tasks = snapshot.docs.map((doc) => {
      const data = doc.data() as ITask;
      return {
        _id: doc.id,
        ...data,
        assignedTo: data.uid,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString() || null,
      };
    });

    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
