const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const app = express();
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
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
app.use("/api/blogs", blogRouter);

module.exports = app;
