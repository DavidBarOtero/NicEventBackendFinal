"use strict";

const mysqlPool = require("../../../database/mysqlPool");

async function getProfessionals(req, res, next) {
  const id = [...req.params.professionalId];
  console.log(res.data);
  console.log(id);
  const sqlQuery = `SELECT * from Professionals 
  where idCity=1 and idProfession= ${id} `;

  try {
    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlQuery);
    connection.release();

    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    console.log(id);

    return res.status(500).send({ message: e.message });
  }
}
module.exports = getProfessionals;
