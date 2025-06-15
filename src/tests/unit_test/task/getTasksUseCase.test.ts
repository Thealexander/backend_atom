process.env.JWT_SECRET = "test123456";

import { getTasksUseCase } from "../../../application/use-cases";
import { db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("getTasksUseCase", () => {
  it("should return all tasks for the user", async () => {
    const mockDocs = [
      {
        id: "1",
        data: () => ({
          title: "Test Task 1",
          description: "Description 1",
          status: "pending",
          priority: "low",
          dueDate: "2025-07-02",
          uid: "user-123",
          completed: false,
          createdAt: { toDate: () => new Date("2025-07-01") },
        }),
      },
    ];

    const mockGet = jest.fn().mockResolvedValue({ docs: mockDocs });
    (db.collection as jest.Mock).mockReturnValue({
      where: () => ({ get: mockGet }),
    });

    const req = { uid: "user-123" } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getTasksUseCase(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ _id: "1", title: "Test Task 1" }),
      ])
    );
  });
});
