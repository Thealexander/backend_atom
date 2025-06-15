import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

process.env.JWT_SECRET = process.env.JWT_SECRET || "test123456";
jest.mock("firebase-admin", () => {
  const original = jest.requireActual("firebase-admin");

  const mockTimestamp = {
    now: jest.fn(() => ({
      toDate: () => new Date("2025-07-01T00:00:00.000Z"),
    })),
  };

  const mockFirestore = Object.assign(() => ({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    update: jest.fn(),
    add: jest.fn(),
  }), {
    Timestamp: mockTimestamp,
  });

  return {
    ...original,
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
    firestore: mockFirestore,
  };
});
