import chai from "chai";
import supertest from "supertest";
import path from "path";
import fs from "fs";
import app from "../src/app.js";
import mongoose from "mongoose";
import petModel from "../src/dao/models/Pet.js";

const expect = chai.expect;
const request = supertest(app);

describe("Test Funcional - Pets", () => {
  let createdPetId;

  const testImagePath = path.join(process.cwd(), "test/assets/tobby.jpg");

  before(async () => {
    if (!fs.existsSync(path.dirname(testImagePath))) {
      fs.mkdirSync(path.dirname(testImagePath), { recursive: true });
    }
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, "fake image content");
    }
  });

  it("GET /api/pets → debería retornar lista de mascotas", async () => {
    const res = await request.get("/api/pets");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
  });

  it("POST /api/pets → debería crear una mascota", async () => {
    const pet = {
      name: "Tobby",
      specie: "Perro",
      birthDate: "2017-02-18",
      adopted: false,
    };

    const res = await request.post("/api/pets").send(pet);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("object");
    expect(res.body.payload).to.have.property("name", "Tobby");

    createdPetId = res.body.payload._id;
  });

  it("POST /api/pets → debería fallar si faltan campos obligatorios", async () => {
    const pet = { name: "SinSpecie" };
    const res = await request.post("/api/pets").send(pet);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "Incomplete values");
  });

  it("POST /api/pets/withimage → debería crear una mascota con imagen", async () => {
    const res = await request
      .post("/api/pets/withimage")
      .field("name", "Rocky")
      .field("specie", "Perro")
      .field("birthDate", "2020-05-10")
      .attach("image", testImagePath);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("name", "Rocky");
    expect(res.body.payload).to.have.property("image");

    createdPetId = res.body.payload._id;

    const saved = await petModel.findById(createdPetId);
    expect(saved).to.exist;
    expect(saved.image).to.include("public/img");
  });

  it("POST /api/pets/withimage → debería fallar si faltan campos obligatorios", async () => {
    const res = await request
      .post("/api/pets/withimage")
      .field("name", "")
      .field("specie", "Perro")
      .field("birthDate", "2020-05-10")
      .attach("image", testImagePath);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "Incomplete values");
  });

  it("PUT /api/pets/:pid → debería actualizar una mascota", async () => {
    const res = await request.put(`/api/pets/${createdPetId}`).send({
      name: "Max",
      adopted: true,
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "pet updated");
  });

  it("PUT /api/pets/:pid → debería fallar si la mascota no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.put(`/api/pets/${fakeId}`).send({ name: "Fake" });
    expect(res.status).to.equal(404);
  });

  it("DELETE /api/pets/:pid → debería eliminar una mascota", async () => {
    const res = await request.delete(`/api/pets/${createdPetId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "pet deleted");
  });

  it("DELETE /api/pets/:pid → debería fallar si la mascota no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request.delete(`/api/pets/${fakeId}`);
    expect(res.status).to.equal(404);
  });
});
