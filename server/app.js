const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const config = require("./config");
const postgresController = require("./controllers/postgresController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.post("/updateToilet", postgresController.updateToilet);

app.post("/janitorClean", postgresController.janitorCompleteClean);

app.post("/janitorUpdateStatus", postgresController.janitorUpdateStatus);

app.listen(config.appConfig.PORT, (err) => {
  console.log(`Listening to Port ${config.appConfig.PORT}`);
  if (err) console.log(err);
});
