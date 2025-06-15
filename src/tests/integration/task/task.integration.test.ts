process.env.JWT_SECRET = "test123456";

import request from "supertest";
import app from "../../../app";


describe("[Integration] Task API", () => {
  let token = "";
  let taskId = "";

  beforeAll(async () => {
    const email = `task_${Date.now()}@example.com`;
    const signupRes = await request(app).post("/api/auth/signup").send({
      email,
      name: "Task",
      lastname: "Tester",
    });
    token = signupRes.body.token;
  });

  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task 1",
        description: "Integration test task",
        status: "pending",
        priority: "medium",
        dueDate: "2025-12-31",
        completed: false,
      });

    expect(res.status).toBe(201);
    expect(res.body.task).toHaveProperty("title", "Task 1");
    taskId = res.body.task.id;
  });

  it("should update the task status", async () => {
    const res = await request(app)
      .patch(`/api/task/${taskId}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completed" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should delete the task", async () => {
    const res = await request(app)
      .delete(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");
  });
});
