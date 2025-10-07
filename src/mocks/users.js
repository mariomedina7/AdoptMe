import { Faker, de } from "@faker-js/faker";
import bcrypt from "bcrypt";

const faker = new Faker({ locale: [de] });

const hashedPassword = bcrypt.hashSync("coder123", 10);

export const generateUser = () => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  password: hashedPassword,
  role: Math.random() < 0.5 ? "user" : "admin",
  pets: [],
});
