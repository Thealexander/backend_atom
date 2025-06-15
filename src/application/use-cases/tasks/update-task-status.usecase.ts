import { Request, Response } from "express";
import { db, admin } from "../../../infraestructure/firebase/firebase";

export const updateTaskStatusUseCase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["pending", "in_progress", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const taskRef = db.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: "Task not found" });
    }

    await taskRef.update({
      status,
      completed: status === "completed",
      updatedAt: admin.firestore.Timestamp.now(),
    });

    return res
      .status(200)
      .json({ message: "Status updated successfully", status });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
