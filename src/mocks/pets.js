import { Faker, en } from "@faker-js/faker";

const faker = new Faker({ locale: [en] });

export const generatePet = () => ({
  name: faker.animal.dog(),
  specie: faker.animal.type(),
  birthDate: faker.date.birthdate({ min: 0, max: 15, mode: "age" }),
  adopted: false,
  image: faker.image.url(),
});
