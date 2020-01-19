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
  const dateFormated = new Date(date);
  var dd = dateFormated.getDate();

  var mm = dateFormated.getMonth() + 1;
  var yyyy = dateFormated.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  var fecha = yyyy + "-" + mm + "-" + dd;
  // .replace("T", " ")
  // .substr(0, 10);

  // console.log(dateFormated);
  try {
    const sqlQuery = `select * from Professionals p,Profession x
where p.idProfessional not in(
select idProfessional FROM Events
WHERE Date=\'${fecha}\') and p.idProfession=${profession}
and x.idProfession=${profession}  AND idCity=${city} order by RatingAverage desc`;

    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlQuery);
    console.log(sqlQuery);
    // console.log(result[0]);
    connection.release();

    res.status(200).send(result[0]);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: e.message });
  }
}
module.exports = getProfessionals;
