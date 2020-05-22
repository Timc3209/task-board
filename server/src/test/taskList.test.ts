import { expect } from "chai";
import { agent as request } from "supertest";
import app from "../server";
import { randomName } from "../lib/tools";
import config from "../lib/config";

describe("TaskList Test", () => {
  let token = "";
  const boardName = randomName();
  let boardID = "";
  const listName = randomName();
  let listID = "";

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
  });

  describe("POST /api/taskList", () => {
    it("Create taskList", async () => {
      const name = randomName();
      const res = await request(app)
        .post("/api/taskList")
        .send({ name: name, boardID: boardID })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
      expect(res.body.taskListID).not.to.be.empty;
      expect(res.body.taskListID).to.be.a("string");
    });
  });

  describe(`PUT /api/taskList/${listID}`, () => {
    it(`Edit Tasklist`, async () => {
      const name = randomName();
      const res = await request(app)
        .put("/api/taskList/" + listID)
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
    });

    it(`Edit Tasklist Invalid ID`, async () => {
      const name = randomName();
      const res = await request(app)
        .put("/api/taskList/000000000000000000000000")
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  describe(`DELETE /api/taskList/${listID}`, () => {
    it(`Delete taskList`, async () => {
      const response = await request(app)
        .delete("/api/taskList/" + listID)
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.empty;
      expect(response.body.status).to.equal(true);
    });

    it(`Delete taskList Invalid ID`, async () => {
      const response = await request(app)
        .delete("/api/taskList/000000000000000000000000")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(400);
    });
  });
});
