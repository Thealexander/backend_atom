process.env.JWT_SECRET = "test123456";

import { createTaskUseCase } from "../../../application/use-cases";
import { db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("createTaskUseCase", () => {
  it("should create a task and return its data", async () => {
    const mockAdd = jest.fn().mockResolvedValue({ id: "task-id" });
    const mockCollection = jest.fn().mockReturnValue({ add: mockAdd });
    jest.spyOn(db, "collection").mockReturnValue(mockCollection as any);

    const req = {
      uid: "user-123",
      body: {
        title: "Test Task",
        description: "Task description",
        status: "pending",
        priority: "medium",
        dueDate: "2025-07-01",
        assignedTo: "user-123",
      },
    } as any;

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await createTaskUseCase(req, res);

    expect(mockAdd).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: "task-id",
        title: "Test Task",
      })
    );
  });
});
