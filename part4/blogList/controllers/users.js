const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

userRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.password || body.password.length <= 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("posts", { title: 1, author: 1, url: 1, likes: 1});
  response.status(200).json(users.map((user) => user.toJSON()));
});

userRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);
  if (!user) {
    return response
      .status(404)
      .json({ error: `user with id ${id} doesn't exist` });
  }
  response.status(200).json(user);
});

module.exports = userRouter;
