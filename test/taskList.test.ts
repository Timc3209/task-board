import { expect } from "chai";
import { agent as request } from "supertest";
import app from "../server/server";
import { randomName } from "../server/lib/tools";

describe("TaskList Test", () => {
  const boardName = randomName();
  let boardID = "";
  const listName = randomName();
  let listID = "";

  before(async () => {
    const res = await request(app)
      .post("/api/board")
      .send({ name: boardName })
      .set("Accept", "application/json");

    boardID = res.body.boardID;

    const response = await request(app)
      .post("/api/taskList")
      .send({ name: listName, boardID: boardID })
      .set("Accept", "application/json");

    listID = response.body.taskListID;
  });

  describe("POST /api/taskList", () => {
    it("Create taskList", async () => {
      const name = randomName();
      const res = await request(app)
        .post("/api/taskList")
        .send({ name: name, boardID: boardID })
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
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  describe(`DELETE /api/taskList/${listID}`, () => {
    it(`Delete taskList`, async () => {
      const response = await request(app)
        .delete("/api/taskList/" + listID)
        .set("Accept", "application/json");
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.empty;
      expect(response.body.status).to.equal(true);
    });

    it(`Delete taskList Invalid ID`, async () => {
      const response = await request(app)
        .delete("/api/taskList/000000000000000000000000")
        .set("Accept", "application/json");
      expect(response.status).to.equal(400);
    });
  });
});
