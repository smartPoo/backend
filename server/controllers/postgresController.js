const config = require("../config");

const { Pool } = require("pg");
const pgClient = new Pool({
  user: config.pgConfig.pgUser,
  host: config.pgConfig.pgHost,
  database: config.pgConfig.pgDatabase,
  password: config.pgConfig.pgPassword,
  port: config.pgConfig.pgPort,
});

const facultyCode = {
  "01": "STI",
  "02": "OAA",
  "20": "GRAD",
  "21": "ENG",
  "22": "ARTS",
  "23": "SCI",
  "24": "POLSCI",
  "25": "ARCH",
  "26": "ACC",
  "27": "EDU",
  "28": "COMART",
  "29": "ECON",
  "30": "MED",
  "31": "VET",
  "32": "DENT",
  "33": "Rx",
  "34": "LAW",
  "35": "FAA",
  "36": "NURS",
  "37": "AHS",
  "38": "PSY",
  "39": "SPSC",
  "40": "CUSAR",
  "51": "CPS",
  "53": "CPHS",
  "55": "CULI",
  "56": "SCII",
}

exports.updateToilet = async (req, res) => {
  let dustbin = req.body.dustbin;
  let tissue = req.body.tissue;
  let status = req.body.status;
  let visits = req.body.visits;
  let toilet_no = req.body.toilet_no;
  let restroom_id = req.body.restroom_id;
  try {
    const updateStatus = pgClient.query(
      `UPDATE Toilet SET current_dustbin=${dustbin},` +
        ` current_tissue=${tissue},` +
        ` current_status=${status},` +
        ` visits_since_lastclean=${visits}` +
        ` WHERE Toilet_no='${toilet_no}' AND Restroom_id='${restroom_id}';`
    );

    const recordStatus = pgClient.query(
      `INSERT INTO Toilet_record VALUES` +
        `('${new Date().toLocaleDateString()}', ${toilet_no}, '${restroom_id}', ${dustbin}, ${tissue}, ${status}, ${visits});`
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
  const queryText =
    "SELECT x.*, gender, faculty, building, floor " +
    "FROM (SELECT restroom_id, SUM(current_vacancy) AS vacancy, SUM(current_status) AS status, COUNT(*) AS total " +
    "FROM toilet " +
    "JOIN restroom USING(restroom_id) " +
    "GROUP BY restroom_id) x " +
    "JOIN restroom USING(restroom_id) " +
    "JOIN location USING(location_id) ";
  let respond = new Array();

  try {
    const allRestroom = await pgClient.query(queryText);
    const restroom = allRestroom.rows;

    restroom.forEach((row) => {
      //calculate status and occupancy
      const malfunction = (row["status"] + row["vacancy"] / 2) / row["total"];
      let status;
      if (malfunction >= 0.7) {
        status = "red";
      } else if (malfunction >= 0.45) {
        status = "orange";
      } else {
        status = "green";
      }
      const occupancy = row["vacancy"] + " / " + row["total"];
      const faculty = facultyCode[row["faculty"]];

      //append to respond
      respond.push({
        restroomID: row["restroom_id"],
        status: status,
        facultyCode: faculty,
        building: row["building"],
        floor: row["floor"],
        gender: row["gender"],
        occupancy: occupancy,
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.json({ data: respond });
};

exports.getRestroom = async (req, res) => {
  const id = req.query.id;
  const queryText =
    "SELECT toilet_no, current_tissue, current_dustbin " +
    "FROM Toilet " +
    "WHERE restroom_id = $1 ";
  let respond = new Array();

  try {
    const restroom = await pgClient.query(queryText, [id]);
    const toilets = restroom.rows;

    toilets.forEach((row) => {
      //append to respond
      respond.push({
        toilet: row["toilet_no"],
        remainingTissue: row["current_tissue"],
        remainingDustbin: row["current_dustbin"],
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  res.json({ data: respond });
};

exports.getActivityHistory = async (req, res) => {
  let emp_id = req.body.emp_id;
  let respond = [];
  try {
    const janitorActivities = (
      await pgClient.query(`SELECT * FROM Activity WHERE emp_id='${emp_id}'`)
    ).rows;
    janitorActivities.forEach((activity) => {
      respond.push({
        taskName: activity["taskname"],
        timestamp: activity["_timestamp"],
      });
    });
  } catch (err) {
    console.log(err);
  }

  res.send({ data: respond });
};

exports.getToDoList = async (req, res) => {
  let emp_id = req.body.emp_id;
  let respond = [];

  try {
    const listOfManagedToilet = await (
      await pgClient.query(
        `SELECT t.* FROM Manage m, Toilet t WHERE m.emp_id='${emp_id}' AND m.restroom_id=t.restroom_id;`
      )
    ).rows;
    listOfManagedToilet.forEach((toilet) => {
      if (toilet["current_dustbin"] < 10) {
        respond.push({
          restroom_id: toilet["restroom_id"],
          toilet_no: toilet["toilet_no"],
          task: "dustbin",
        });
      }
      if (toilet["current_tissue"] < 10) {
        respond.push({
          restroom_id: toilet["restroom_id"],
          toilet_no: toilet["toilet_no"],
          task: "tissue",
        });
      }
      if (toilet["visits_since_lastclean"] > 20) {
        respond.push({
          restroom_id: toilet["restroom_id"],
          toilet_no: toilet["toilet_no"],
          task: "clean",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
  res.send({ data: respond });
};

exports.completeTask = async (req, res) => {
  let emp_id = req.body.emp_id;
  let taskname = req.body.taskname;
  let _timestamp = new Date().toLocaleDateString();
  try {
    await pgClient.query(
      `INSERT INTO Activity VALUES ('${emp_id}', '${taskname}', '${_timestamp}');`
    );
  } catch (err) {
    console.log(err);
  }
  res.send("OK!");
};
