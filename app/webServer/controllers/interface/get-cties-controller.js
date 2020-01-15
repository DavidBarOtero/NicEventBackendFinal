"use strict";

const mysqlPool = require("./../../../database/mysqlPool");

async function getCities(req, res, next) {
  try {
    const sqlQuery = "SELECT  * FROM Cities";
    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlQuery);
    connection.release();
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: e.message });
  }
}

module.exports = getCities;
