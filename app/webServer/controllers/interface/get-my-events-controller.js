"use strict";
const mysqlPool = require("./../../../database/mysqlPool");
async function myEvents(req, res, next) {
  const { userId } = req.claims;
  const result = req.body;

  console.log(result);
  try {
    const sqlQuery = `SELECT * FROM Events 
inner join Professionals on Professionals.idProfessional=Events.idProfessional
where Events.idOrganizer=${userId} order by Date desc`;

    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlQuery);
    connection.release();

    res.status(200).send(result[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: e.message });
  }
}

module.exports = myEvents;
