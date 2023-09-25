import app from "../app.js";
import request from "supertest";
import db from "../database/index.js";

const Users = db.users;

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
});

afterAll(async () => {
  await Users.destroy({
    where: { username: "test" },
  });
});

test("login user berhasil", async () => {
  const response = await request(app)
    .post("/auth/login")
    .send({
      email: "test@gmail.com",
      password: "secret",
    })
    .set("Accept", "application/json");

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("success", true);
});

test("Login user gagal karena akun tidak ditemukan", async () => {
  const response = await request(app)
    .post("/auth/login")
    .send({
      email: "akunlain@gmail.com",
      password: "secret",
    })
    .set("Accept", "application/json");

  expect(response.statusCode).toBe(400);
  expect(response.body).toHaveProperty("message");
  expect(response.body).toHaveProperty("success", false);
});
