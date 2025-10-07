import { generateUser, generatePet } from "../mocks/index.js";
import { usersService, petsService } from "../services/index.js";

const getMockUsers = async (req, res) => {
  const count = parseInt(req.query.count) || 50;
  const users = Array.from({ length: count }, () => generateUser());
  res.send({ status: "success", payload: users });
};

const getMockPets = async (req, res) => {
  const count = parseInt(req.query.count) || 100;
  const pets = Array.from({ length: count }, () => generatePet());
  res.send({ status: "success", payload: pets });
};

const generateData = async (req, res) => {
  try {
    const { users: usersCount = 0, pets: petsCount = 0 } = req.body;

    if (usersCount <= 0 || petsCount <= 0) {
      return res.status(400).json({ error: "Los números deben ser positivos y mayores a cero" });
    }

    const users = Array.from({ length: usersCount }, () => generateUser());
    const insertedUsers = await usersService.createMany(users);

    const pets = Array.from({ length: petsCount }, () => generatePet());
    const petsWithOwners = pets.map((pet) => {
      const owner =
        insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      pet.owner = owner._id;
      return pet;
    });

    const insertedPets = await petsService.createMany(petsWithOwners);

    await Promise.all(
      insertedPets.map((pet) =>
        usersService.updateById(pet.owner, {
          $push: { pets: { _id: pet._id } },
        })
      )
    );

    res.status(201).json({
      message: "Datos generados correctamente",
      users: insertedUsers.length,
      pets: insertedPets.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al generar los datos" });
  }
};

export default { getMockUsers, getMockPets, generateData };
