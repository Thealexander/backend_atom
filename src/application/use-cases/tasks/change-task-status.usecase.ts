import { db, admin } from "../../../infraestructure/firebase/firebase";

export const changeTaskStatusCase = async (taskId: string, status: string) => {
  const taskRef = db.collection("tasks").doc(taskId);
  const taskDoc = await taskRef.get();

  if (!taskDoc.exists) {
    throw new Error("Task not found");
  }

  await taskRef.update({
    status,
    completed: status === "completed",
    updatedAt: admin.firestore.Timestamp.now(),
  });

  return { message: "Task status updated successfully" };
};
