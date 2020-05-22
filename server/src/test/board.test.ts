import { expect } from "chai";
import { agent as request } from "supertest";
import app from "../server";
import { randomName } from "../lib/tools";
import config from "../lib/config";

describe("Board Test", () => {
  let token = "";
  const boardName = randomName();
  let boardID = "";
  const listName = randomName();
  let listID = "";
  const taskName = randomName();

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

    await request(app)
      .post("/api/task")
      .send({ name: taskName, listID: listID })
      .set("authorization", "Bearer " + token)
      .set("Accept", "application/json");
  });

  describe("POST /api/board", () => {
    it("Create Board", async () => {
      const name = randomName();
      const res = await request(app)
        .post("/api/board")
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
      expect(res.body.boardID).not.to.be.empty;
      expect(res.body.boardID).to.be.a("string");
    });

    it("Create Board Duplicate Name", async () => {
      const res = await request(app)
        .post("/api/board")
        .send({ name: boardName })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });

    it("Create Board Missing Name", async () => {
      const res = await request(app)
        .post("/api/board")
        .send({ status: 0 })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  describe(`PUT /api/board/${boardID}`, () => {
    it(`Edit Board`, async () => {
      const name = randomName();
      const res = await request(app)
        .put("/api/board/" + boardID)
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
    });

    it(`Edit Board Invalid ID`, async () => {
      const name = randomName();
      const res = await request(app)
        .put("/api/board/000000000000000000000000")
        .send({ name: name })
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  describe(`GET /api/board/${boardID}`, () => {
    it(`Get board`, async () => {
      const response = await request(app)
        .get("/api/board/" + boardID)
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.empty;
      expect(response.body.status).to.equal(true);
      expect(response.body.board).not.to.be.empty;
      expect(response.body.board).to.be.an("object");
    });
  });

  describe(`GET /api/board/${boardID}`, () => {
    it(`Get board Tasklist`, async () => {
      const response = await request(app)
        .get("/api/board/" + boardID)
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.empty;
      expect(response.body.status).to.equal(true);
      expect(response.body.board).not.to.be.empty;
      expect(response.body.board).to.be.an("object");
      expect(response.body.board.taskList).to.be.an("array");
      expect(response.body.board.taskList[0]).to.be.an("object");
      expect(response.body.board.taskList[0].tasks).to.be.an("array");
      expect(response.body.board.taskList[0].tasks[0]).to.be.an("object");
    });
  });

  describe(`GET /api/board`, () => {
    it("Get all boards", async () => {
      const res = await request(app)
        .get("/api/board")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body.status).to.equal(true);
      expect(res.body.boards).not.to.be.empty;
      expect(res.body.boards).to.be.an("array");
    });
  });

  describe(`DELETE /api/board/${boardID}`, () => {
    it(`Delete Board`, async () => {
      const response = await request(app)
        .delete("/api/board/" + boardID)
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.empty;
      expect(response.body.status).to.equal(true);
    });

    it(`Delete Board Invalid ID`, async () => {
      const response = await request(app)
        .delete("/api/board/000000000000000000000000")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(response.status).to.equal(400);
    });
  });
});
