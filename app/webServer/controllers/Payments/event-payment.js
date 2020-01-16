"use strict";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRIPKEY);

async function payment(req, res, next) {
  const professionalName = req.body.data.name;
  const professionalEmail = req.body.data.email;
  console.log(professionalEmail);
  console.log(professionalName);
  const msg = {
    to: "davidbarotero@gmail.com",
    from: "NiceEvent@gmail.com",
    subject: "Nuevo evento confirmado y pagado",
    text: `Hola ${professionalName} Has sido contratado para un evento en la siguiente fecha: `
  };
  try {
    const data = await sgMail.send(msg);
  } catch (err) {
    console.error(err);
  }
}
module.exports = payment;
