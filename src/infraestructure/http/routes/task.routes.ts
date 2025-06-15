import { Router } from "express";
import { tokenValidation } from "../../middlewares";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers";

const router = Router();

router.use(tokenValidation); // proteccion de  todos los endpoints

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/status", updateTaskStatus);

export default router;
