import { expect } from "chai";
import { agent as request } from "supertest";
import app from "../server";
import { randomName } from "../lib/tools";
import config from "../lib/config";

describe("Task Test", () => {
  let token = "";
  const boardName = randomName();
  let boardID = "";
  const listName = randomName();
  let listID = "";
  const taskName = randomName();
  let taskID = "";

  before(async () => {
    const auth = await request(app)
      .post("/api/auth/login")
      .send({ username: config.defaultUser, password: config.defaultPassword })
      .set("Accept", "application/json");

    token = auth.body.token;

    const res = await request(app)
      .post("/api/board")
      .send({ name: boardName })
      .set("authorization", "Bearer " + token)
      .set("Accept", "application/json");

    boardID = res.body.boardID;

    const response = await request(app)
      .post("/api/taskList")
      .send({ name: listName, boardID: boardID })
      .set("authorization", "Bearer " + token)
      .set("Accept", "application/json");

    listID = response.body.taskListID;

    const taskResponse = await request(app)
      .post("/api/task")
      .send({ name: taskName, listID: listID })
      .set("authorization", "Bearer " + token)
      .set("Accept", "application/json");

    taskID = taskResponse.body.taskID;
  });

  describe("POST /api/task", () => {
    it("Create task", async () => {
      const name = randomName();
      const res = await request(app)
        .post("/api/task")
        .send({ name: name, listID: listID })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
      expect(res.body.taskID).not.to.be.empty;
      expect(res.body.taskID).to.be.a("string");
    });
  });

  describe(`PUT /api/task/${taskID}`, () => {
    it(`Edit task`, async () => {
      const name = randomName();
      const res = await request(app)
        .put("/api/task/" + taskID)
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
    });

    it(`Edit task Invalid ID`, async () => {
      const name = randomName();
      const res = await request(app)
        .put("/api/task/000000000000000000000000")
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  describe(`DELETE /api/task/${taskID}`, () => {
    it(`Delete task`, async () => {
      const response = await request(app)
        .delete("/api/task/" + taskID)
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.empty;
      expect(response.body.status).to.equal(true);
    });

    it(`Delete task Invalid ID`, async () => {
      const response = await request(app)
        .delete("/api/task/000000000000000000000000")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(400);
    });
  });
});
