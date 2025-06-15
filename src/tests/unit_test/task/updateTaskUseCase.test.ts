process.env.JWT_SECRET = "test123456";

import { updateTaskUseCase } from "../../../application/use-cases";
import { admin, db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("updateTaskUseCase", () => {
  it("should update a task for the correct user", async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValue({ exists: true, data: () => ({ uid: "test-uid" }) });
    const mockUpdate = jest.fn();
    const mockNow = jest.fn().mockReturnValue("timestamp");

    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ get: mockGet, update: mockUpdate }),
    });
    (admin.firestore.Timestamp.now as jest.Mock) = mockNow;

    const req = {
      uid: "test-uid",
      params: { id: "task-id" },
      body: { title: "Test Task" },
    } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await updateTaskUseCase(req, res);

    expect(mockUpdate).toHaveBeenCalledWith({
      title: "Test unit Execution",
      updatedAt: "timestamp",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
