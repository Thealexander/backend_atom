process.env.JWT_SECRET = "test123456";

import { registerUserUseCase } from "../../../application/use-cases";
import { auth, db } from "../../../infraestructure/firebase/firebase";

jest.mock("firebase-admin");

describe("registerUserUseCase", () => {
  it("should register a user and return user data with token", async () => {
    const mockCreateUser = jest.fn().mockResolvedValue({
      uid: "new-uid",
      email: "test@example.com",
    });
    const mockSet = jest.fn();

    (auth.createUser as jest.Mock) = mockCreateUser;
    (db.collection as jest.Mock).mockReturnValue({
      doc: () => ({ set: mockSet }),
    });

    const req = {
      body: { email: "test@example.com", name: "Test", lastname: "User" },
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await registerUserUseCase(req, res);

    expect(mockCreateUser).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(mockSet).toHaveBeenCalledWith({
      uid: "new-uid",
      email: "test@example.com",
      name: "Test",
      lastname: "User",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User created successfully",
        user: expect.objectContaining({ name: "New" }),
        token: expect.any(String),
      })
    );
  });
});
