import { Request, Response } from "express";
import {
  createTaskUseCase,
  getTasksUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
  changeTaskStatusCase,
} from "../../../application/use-cases";

interface ExtendedRequest extends Request {
  uid?: string;
}

export const createTask = async (req: Request, res: Response) => {
  return await createTaskUseCase(req as ExtendedRequest, res);
};

export const getTasks = async (req: Request, res: Response) => {
  return await getTasksUseCase(req as ExtendedRequest, res);
};

export const updateTask = async (req: Request, res: Response) => {
  return await updateTaskUseCase(req as ExtendedRequest, res);
};

export const deleteTask = async (req: Request, res: Response) => {
  return await deleteTaskUseCase(req as ExtendedRequest, res);
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const result = await changeTaskStatusCase(id, status);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error updating task status:", error);
    return res.status(500).json({ error: error.message });
  }
};
