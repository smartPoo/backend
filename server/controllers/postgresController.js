const config = require("../config");

const { Pool } = require("pg");
const pgClient = new Pool({
  user: config.pgConfig.pgUser,
  host: config.pgConfig.pgHost,
  database: config.pgConfig.pgDatabase,
  password: config.pgConfig.pgPassword,
  port: config.pgConfig.pgPort,
});

exports.updateToilet = async (req, res) => {
  try {
    const updateStatus = pgClient.query(
      `UPDATE Toilet SET current_dustbin=${req.body.dustbin},` +
        ` current_tissue=${req.body.tissue},` +
        ` current_status=${req.body.status},` +
        ` visits_since_lastclean=${req.body.visits}` +
        ` WHERE Toilet_no='${req.body.toilet_no}' AND Restroom_id='${req.body.restroom_id}';`
    );

    const recordStatus = pgClient.query(
      `INSERT INTO Toilet_record VALUES` +
        `('${new Date().toLocaleDateString()}', ${req.body.toilet_no}, '${
          req.body.restroom_id
        }', ${req.body.dustbin}, ${req.body.tissue}, ${req.body.status}, ${
          req.body.visits
        });`
    );

    res.send([updateStatus, recordStatus]);
  } catch (err) {
    console.log(err);
  }
};

exports.janitorCompleteClean = async (req, res) => {
  const updateStatus = pgClient.query(
    `UPDATE Toilet SET ` +
      ` visits_since_lastclean=0, current_status=0` +
      ` WHERE Toilet_no='${req.body.toilet_no}' AND Restroom_id='${req.body.restroom_id}';`
  );

  res.send(updateStatus);
};

exports.janitorUpdateStatus = async (req, res) => {
  const updateStatus = pgClient.query(
    `UPDATE Toilet SET ` +
      ` current_status=${req.body.status}` +
      ` WHERE Toilet_no='${req.body.toilet_no}' AND Restroom_id='${req.body.restroom_id}';`
  );

  res.send(updateStatus);
};
