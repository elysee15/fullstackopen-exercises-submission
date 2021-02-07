const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

const initialState = [
  {
    username: "hellas",
    name: "Artos Hellas",
    password: "hello0000",
  },
  {
    username: "james01",
    name: "Jame coner",
    password: "jc010101",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (let _user of initialState) {
    const user = new User(_user);
    await user.save();
  }
});

test("should create a valid user", async () => {
  const newUser = {
    username: "Jamie09",
    name: "Jamie Lannister",
    password: "jamiel1234",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("should create an invalid user", async () => {
  const newUser = {
    username: "jamie01",
    name: "Jamie Lannister",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect('{"error":"Password must be at least 3 characters long"}');
});

afterAll(() => {
  mongoose.connection.close();
});
