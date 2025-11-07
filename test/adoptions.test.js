import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import petModel from "../src/dao/models/Pet.js";
import userModel from "../src/dao/models/User.js";

const expect = chai.expect;
const request = supertest(app);

describe("Test Funcional - Adoptions", () => {
  let userId, petId, adoptionId;

  before(async () => {
    const user = await userModel.create({
      first_name: "TestUser",
      last_name: "Adoption",
      email: "testadoption@example.com",
      password: "1234",
      role: "user",
    });
    const pet = await petModel.create({
      name: "Lucky",
      specie: "Perro",
      birthDate: "2021-01-01",
      adopted: false,
    });

    userId = user._id;
    petId = pet._id;
  });

  it("GET /api/adoptions → debería retornar lista de adopciones", async () => {
    const res = await request.get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
  });

  it("POST /api/adoptions/:uid/:pid → debería crear una adopción", async () => {
    const res = await request.post(`/api/adoptions/${userId}/${petId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Pet adopted");
    expect(res.body.payload).to.have.property("_id");
    expect(res.body.payload).to.have.property("owner", userId.toString());
    expect(res.body.payload).to.have.property("pet", petId.toString());

    adoptionId = res.body.payload._id;
  });

  it("POST → debería fallar si el usuario no existe", async () => {
    const fakeUserId = new mongoose.Types.ObjectId();
    const res = await request.post(`/api/adoptions/${fakeUserId}/${petId}`);
    expect(res.status).to.be.oneOf([400, 404]);
  });

  it("POST → debería fallar si la mascota no existe", async () => {
    const fakePetId = new mongoose.Types.ObjectId();
    const res = await request.post(`/api/adoptions/${userId}/${fakePetId}`);
    expect(res.status).to.be.oneOf([400, 404]);
  });

  it("GET /api/adoptions/:aid → debería devolver una adopción específica", async () => {
    const res = await request.get(`/api/adoptions/${adoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload._id).to.equal(adoptionId);
  });

  it("GET /api/adoptions/:aid → debería fallar con ID inexistente", async () => {
    const fakeAdoptionId = new mongoose.Types.ObjectId();
    const res = await request.get(`/api/adoptions/${fakeAdoptionId}`);
    expect(res.status).to.equal(404);
  });
});
