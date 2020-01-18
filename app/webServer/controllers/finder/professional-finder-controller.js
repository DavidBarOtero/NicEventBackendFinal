"use strict";

const mysqlPool = require("../../../database/mysqlPool");

async function getProfessionals(req, res, next) {
  const profession = [...req.params.professionId];
  const city = [...req.params.cityId];
  const date = [req.params.date];

  console.log(profession);
  console.log(city);
  console.log(date);
  // const dateFormat = new Date(date)
  //   .toISOString()
  //   .replace(/T/, " ")
  //   .replace(/\..+/, "");
  const dateFormated = new Date(date)
    .toISOString()
    .replace("T", " ")
    .substr(0, 10);
  console.log(dateFormated);

  try {
    const sqlQuery = `SELECT * from Professionals 
    INNER JOIN Profession ON Profession.idProfession=Professionals.idProfession
  
    WHERE Profession.idProfession= ${profession} AND idCity=${city} `;

    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlQuery);
    // console.log(result[0]);
    connection.release();

    res.status(200).send(result[0]);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: e.message });
  }
}
module.exports = getProfessionals;
