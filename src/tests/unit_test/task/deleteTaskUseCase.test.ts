process.env.JWT_SECRET = "test123456";

import { deleteTaskUseCase } from "../../../application/use-cases";
import { db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("deleteTaskUseCase", () => {
  it("should delete a task if user is authorized", async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValue({ exists: true, data: () => ({ uid: "test-uid" }) });
    const mockDelete = jest.fn();

    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ get: mockGet, delete: mockDelete }),
    });

    const req = { uid: "test-uid", params: { id: "task-id" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await deleteTaskUseCase(req, res);

    expect(mockDelete).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task deleted successfully",
    });
  });
});
