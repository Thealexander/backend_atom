process.env.JWT_SECRET = "test123456";

import request from "supertest";
import app from "../../../app";

describe("[Integration] Auth API", () => {
  let testToken = "";
  const testEmail = `test_${Date.now()}@example.com`;

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email: testEmail,
      name: "Alex",
      lastname: "Gaitan",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({ name: "Alex" });
    testToken = res.body.token;
  });

  it("should fetch profile of authenticated user", async () => {
    const res = await request(app)
      .get("/api/auth/getMe")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty("name");
  });
});
