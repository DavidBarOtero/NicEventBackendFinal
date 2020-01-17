"use strict";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRIPKEY);

async function payment(req, res, next) {
  const professionalName = req.body.data.name;
  const professionalEmail = req.body.data.email;
  console.log(professionalEmail);
  console.log(professionalName);
  const msg = {
    to: `${professionalEmail}`,

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
