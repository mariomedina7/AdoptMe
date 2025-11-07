import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import userModel from "../src/dao/models/User.js";

const expect = chai.expect;
const request = supertest(app);

describe("Test Funcional - Users", () => {
  let userId;

  before(async () => {
    const user = await userModel.create({
      first_name: "Mario",
      last_name: "Medina",
      email: "mario@example.com",
      password: "1234",
      role: "user",
    });
    userId = user._id;
  });

  it("GET /api/users → debería retornar lista de usuarios", async () => {
    const res = await request.get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
  });

  it("GET /api/users/:uid → debería retornar un usuario", async () => {
    const res = await request.get(`/api/users/${userId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("object");
    expect(res.body.payload).to.have.property("_id", userId.toString());
  });

  it("GET /api/users/:uid → debería devolver 404 si el usuario no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.get(`/api/users/${fakeId}`);
    expect(res.status).to.equal(404);
  });

  it("PUT /api/users/:uid → debería actualizar usuario existente", async () => {
    const res = await request
      .put(`/api/users/${userId}`)
      .send({ first_name: "Lucho" });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User updated");
  });

  it("PUT /api/users/:uid → debería devolver 404 si el usuario no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request
      .put(`/api/users/${fakeId}`)
      .send({ first_name: "Fake" });
    expect(res.status).to.equal(404);
  });

  it("DELETE /api/users/:uid → debería eliminar usuario", async () => {
    const res = await request.delete(`/api/users/${userId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User deleted");
  });

  it("DELETE /api/users/:uid → debería devolver 404 si el usuario no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.delete(`/api/users/${fakeId}`);
    expect(res.status).to.equal(404);
  });
});
