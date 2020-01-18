"use strict";
const mysqlPool = require("./../../../database/mysqlPool");

async function ratePastEvents(req, res, next) {
  const idProfessional = req.body.data.idProfessional;

  const rate = req.body.data.rate;

  const idEvent = req.body.data.idEvent;

  const getRatingAverage = `select RatingAverage,RatingCount from Professionals
where Professionals.idProfessional=${idProfessional} `;

  try {
    const connection = await mysqlPool.getConnection();

    const getActualRatingAverage = await connection.query(getRatingAverage);

    const actualRatingAverage = getActualRatingAverage[0][0].RatingAverage;

    const actualRatingCount = getActualRatingAverage[0][0].RatingCount;

    const newRatingAverage =
      ((+rate + +actualRatingAverage) / (+actualRatingCount + 1)) * 50;

    // console.log(newRatingAverage);

    const newRatingCount = +actualRatingCount + 1;

    const ratingAverageCountUpdated = await connection.query(
      `UPDATE  Professionals
      SET RatingAverage=${newRatingAverage},
      RatingCount=${newRatingCount}
      WHERE idProfessional= ${idProfessional};
    `
    );

    connection.release();

    console.log(rate);

    console.log(newRatingAverage);

    console.log(actualRatingCount);
    // console.log(ratingAverageCountUpdated);

    res.status(200).send({
      message: "rating completado"
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: e.message });
  }
}

module.exports = ratePastEvents;
