process.env.JWT_SECRET = "test123456";

import { signInUserUseCase } from "../../../application/use-cases";
import { auth, db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("signInUserUseCase", () => {
  it("should sign in a user and return token", async () => {
    const mockGetUserByEmail = jest.fn().mockResolvedValue({
      uid: "test-uid",
      email: "test@example.com",
    });
    const mockGet = jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({ name: "Test", lastname: "User" }),
    });

    (auth.getUserByEmail as jest.Mock) = mockGetUserByEmail;
    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ get: mockGet }),
    });

    const req = { body: { email: "test@example.com" } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await signInUserUseCase(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User signed in successfully",
        user: expect.objectContaining({ name: "Test" }),
        token: expect.any(String),
      })
    );
  });
});
