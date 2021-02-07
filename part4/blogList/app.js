const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const app = express();
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require('./utils/middleware')
const morgan = require("morgan");

logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info(`Mongo connected successfully`);
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB`, error.message);
  });

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
