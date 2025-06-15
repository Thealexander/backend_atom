process.env.JWT_SECRET = "test123456";

import { getUserProfileUseCase } from "../../../application/use-cases";
import { db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("getUserProfileUseCase", () => {
  it("should return user profile if exists", async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValue({ exists: true, data: () => ({ name: "Alex" }) });
    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ get: mockGet }),
    });

    const req = { uid: "test-uid" } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getUserProfileUseCase(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: { name: "Alex" } });
  });
});
