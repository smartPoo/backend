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

exports.getAllRestroom = async (req, res) => {
  const queryText = "SELECT x.*, gender, faculty, building, floor" + 
                    "FROM (SELECT restroom_id, SUM(current_vacancy) AS vacancy, SUM(current_status) AS status, COUNT(*) AS total" + 
                          "FROM toilet" +
                          "JOIN restroom USING(restroom_id)" + 
                          "GROUP BY restroom_id) x" + 
                    "JOIN restroom USING(restroom_id)" + 
                    "JOIN location USING(location_id)";
  let respond = new Array();

  try {
    const allRestroom = await pgClient.query(queryText);
    const restroom = allRestroom.rows;

    restroom.forEach((row) => {
      //calculate status and occupancy
      const malfunction = (row["status"] + (row["vacancy"] / 2)) / row["total"];
      let status;
      if(malfunction >= 0.70) {
        status = "red";
      } else if(malfunction >= 0.45) {
        status = "orange";
      } else {
        status = "green";
      }
      const occupancy = row["vacancy"] + " / " + row["total"];

      //append to respond
      respond.push({
        restroomID: row["restroom_id"],
        status: status,
        faculty: row["faculty"],
        building: row["building"],
        floor: row["floor"],
        gender: row["gender"],
        occupancy: occupancy
      });
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
  
  res.json({ data: respond });
};

exports.getRestroom = async (req, res) => {
  const { id } = req.params;
  const queryText = "SELECT toilet_no, current_tissue, current_dustbin" + 
                    "FROM Toilet" + 
                    "WHERE restroom_id = $1";
  let respond = new Array();

  try {
    const restroom = await pgClient.query(queryText, [id]); 
    const toilets = restroom.rows;

    toilets.forEach((row) => {
      //append to respond
      respond.push({
        toilet: row["toilet_no"],
        remainingTissue: row["current_tissue"],
        remainingDustbin: row["current_dustbin"]
      });
    });
  }
  catch (err) {
      res.status(400).json({ message: err.message });
  }

  res.json({ data: respond });   
};