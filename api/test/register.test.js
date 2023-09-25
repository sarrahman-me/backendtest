import app from "../app.js";
import request from "supertest";
import db from "../database/index.js";

const Users = db.users;

beforeAll(async () => {
  await Users.destroy({
    where: { username: "test" },
  });
});

afterAll(async () => {
  await Users.destroy({
    where: { username: "test" },
  });
});

test("Menambahkan user baru", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({
      nama: "test",
      username: "test",
      email: "test@gmail.com",
      whatsapp: "+628123456789",
      password: "secret",
    })
    .set("Accept", "application/json");

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("success", true);
});

test("Menambahkan user baru gagal (username sudah ada)", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({
      nama: "test",
      username: "test",
      email: "test@gmail.com",
      whatsapp: "+628123456789",
      password: "secret",
    })
    .set("Accept", "application/json");

  expect(response.statusCode).toBe(400);
  expect(response.body).toHaveProperty("message");
  expect(response.body).toHaveProperty("success", false);
});

test("Menambahkan user baru gagal (email sudah ada)", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({
      nama: "test",
      username: "testlagi",
      email: "test@gmail.com",
      whatsapp: "+628123456789",
      password: "secret",
    })
    .set("Accept", "application/json");

  expect(response.statusCode).toBe(400);
  expect(response.body).toHaveProperty("message");
  expect(response.body).toHaveProperty("success", false);
});

test("Menambahkan user baru gagal (whatsapp sudah ada)", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({
      nama: "test",
      username: "testlagi",
      email: "testlagi@gmail.com",
      whatsapp: "+628123456789",
      password: "secret",
    })
    .set("Accept", "application/json");

  expect(response.statusCode).toBe(400);
  expect(response.body).toHaveProperty("message");
  expect(response.body).toHaveProperty("success", false);
});
