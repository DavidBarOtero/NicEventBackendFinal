"use strict";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRIPKEY);

async function payment(req, res, next) {
  const professionalName = req.body.name;
  const professionalEmail = req.body.email;
  console.log(professionalName);
  console.log(professionalEmail);
  const msg = {
    to: `${professionalEmail}`,
    // to: "davidbarotero@gmail.com",
    from: "NiceEvent@gmail.com",
    subject: "Nuevo evento cerrado",
    text: `¡¡Enhorabuena!! ${professionalName} has sido elegido para un evento en la siguiente fecha: `
  };
  console.log(msg);
  try {
    const data = await sgMail.send(msg);
  } catch (err) {
    console.error(err);
  }
}
module.exports = payment;
