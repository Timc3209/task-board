import { expect } from "chai";
import { agent as request } from "supertest";
import app from "../server";
import { randomName } from "../lib/tools";
import config from "../lib/config";

describe("Auth Test", () => {
  describe("POST /auth/login", () => {
    it("Login Success", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: config.defaultUser,
          password: config.defaultPassword,
        })
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);
    });
    it("Verify Success", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: config.defaultUser,
          password: config.defaultPassword,
        })
        .set("Accept", "application/json");
      expect(res.status).to.equal(200);

      const token = res.body.token;

      const auth = await request(app)
        .get("/api/auth/verify")
        .set("authorization", "Bearer " + token)
        .set("Accept", "application/json");
      expect(auth.status).to.equal(200);
    });
    it("Login Invalid Password", async () => {
      const random = randomName();
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: config.defaultUser,
          password: random,
        })
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
    it("Login Invalid username/password", async () => {
      const random = randomName();
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: random,
          password: random,
        })
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
    it("Login Missing password", async () => {
      const random = randomName();
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          username: random,
        })
        .set("Accept", "application/json");
      expect(res.status).to.equal(400);
    });
  });
});
