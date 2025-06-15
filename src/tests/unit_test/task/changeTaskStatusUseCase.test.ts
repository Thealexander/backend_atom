process.env.JWT_SECRET = "test123456";

import { admin, db } from "../../../infraestructure/firebase/firebase";
import { changeTaskStatusCase } from "../../../application/use-cases";

jest.mock("firebase-admin");

describe("changeTaskStatusUseCase", () => {
  it("should update status and completion of task", async () => {
    const mockGet = jest.fn().mockResolvedValue({ exists: true });
    const mockUpdate = jest.fn();
    const mockNow = jest.fn().mockReturnValue("timestamp");

    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ get: mockGet, update: mockUpdate }),
    });
    (admin.firestore.Timestamp.now as jest.Mock) = mockNow;

    const taskId = "task-123";
    const status = "completed";

    const result = await changeTaskStatusCase(taskId, status);

    expect(mockUpdate).toHaveBeenCalledWith({
      status,
      completed: true,
      updatedAt: "timestamp",
    });
    expect(result).toEqual({ message: "Task status updated successfully" });
  });
});
