import app from "../app.js";
import request from "supertest";
import db from "../database/index.js";

const Users = db.users;

let token = null;

beforeAll(async () => {
  await request(app)
    .post("/auth/register")
    .send({
      nama: "test",
      username: "test",
      email: "test@gmail.com",
      whatsapp: "+628123456789",
      password: "secret",
    })
    .set("Accept", "application/json");

  const response = await request(app)
    .post("/auth/login")
    .send({
      email: "test@gmail.com",
      password: "secret",
    })
    .set("Accept", "application/json");

  token = response.body.data.token;
});

afterAll(async () => {
  await Users.destroy({
    where: { username: "test" },
  });
});

test("berhasil mengambil user yang sedang login", async () => {
  const response = await request(app)
    .get("/auth/user")
    .set("Accept", "application/json")
    .set("Cookie", `tx=${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("success", true);
});
