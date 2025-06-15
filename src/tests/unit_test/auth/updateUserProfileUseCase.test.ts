process.env.JWT_SECRET = "test123456";

import { updateUserProfileUseCase } from "../../../application/use-cases";
import { db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("updateUserProfileUseCase", () => {
  it("should update user profile fields", async () => {
    const mockUpdate = jest.fn();
    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ update: mockUpdate }),
    });

    const req = {
      uid: "test-uid",
      body: { name: "Alexander", lastname: "Gaitan" },
    } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await updateUserProfileUseCase(req, res);

    expect(mockUpdate).toHaveBeenCalledWith({
      name: "Alexander",
      lastname: "Gaitan",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile updated successfully",
    });
  });
});
