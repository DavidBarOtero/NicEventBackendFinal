"use strict";
const mysqlPool = require("../../../database/mysqlPool");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRIPKEY);

async function payment(req, res, next) {
  const professionalName = req.body.name;
  const professionalEmail = req.body.email;
  const eventDate = req.body.datePicker;
  const idProfessional = req.body.idProfessional;
  const idCity = req.body.idCity;
  const { userId } = req.claims;

  const eventDateFormated = new Date(eventDate)

    .toISOString()
    .replace("T", " ")
    .substr(0, 10);
  console.log(professionalName);
  console.log(professionalEmail);
  console.log(eventDate);

  const msg = {
    to: `${professionalEmail}`,
    // to: "davidbarotero@gmail.com",
    from: "NiceEvent@gmail.com",
    subject: "Nuevo evento cerrado",
    text: `¡¡Enhorabuena!! ${professionalName} has sido elegido para un evento en la siguiente fecha: ${eventDateFormated}`
  };

  //   const queryFreeDate = `Select * From Events
  //  WHERE Date=${eventDateFormated}  AND idProfessional=${userId}`;
  const sqlQuery = "INSERT INTO Events SET ?";
  try {
    const connection = await mysqlPool.getConnection();
    // const resultFreeDate = await connection.query(queryFreeDate);
    // console.log(resultFreeDate);

    const result = await connection.query(sqlQuery, {
      Date: eventDateFormated,
      IdCity: idCity,
      idOrganizer: userId,
      idProfessional: idProfessional
    });
    const data = await sgMail.send(msg);
    connection.release();
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    // }
  }
}
module.exports = payment;
