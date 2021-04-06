const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const config = require("./config");
const postgresController = require("./controllers/postgresController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/", (req, res) => {
  res.send(`Status OK!`);
});

app.use("/updateToilet", postgresController.updateToilet);

app.listen(config.PORT, () => {
  console.log(`Listening to Port ${config.appConfig.PORT}`);
});
