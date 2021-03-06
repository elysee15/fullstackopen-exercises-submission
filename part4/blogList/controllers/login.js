const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (!(username && password)) {
    return response
      .status(401)
      .json({ error: "Username or password are missing" });
  }

  const user = await User.findOne({ username });
  const isPasswordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  //generate token
  const token = jwt.sign(payload, process.env.SECRET);
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
