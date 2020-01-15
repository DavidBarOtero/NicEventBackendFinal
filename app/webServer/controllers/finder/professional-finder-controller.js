"use strict";

const mysqlPool = require("../../../database/mysqlPool");

async function getProfessionals(req, res, next) {
  const profession = [...req.params.professionId];
  const city = [...req.params.cityId];

  console.log(profession);
  console.log(city);

  try {
    const sqlQuery = `select * from Professionals 
    
    inner join Profession on Profession.idProfession=Professionals.idProfessional
    where Profession.idProfession= ${id} and where idCity=${city}`;

    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlQuery);
    connection.release();

    res.status(200).send(result);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: e.message });
  }
}
module.exports = getProfessionals;
