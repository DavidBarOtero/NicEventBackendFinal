"use strict";
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

const mysqlPool = require("../../../database/mysqlPool");

async function userValidateSchema(payload) {
  const schema = Joi.object()({
    name: Joi.string().required(),
    lastName: Joi.string().required(),

    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    profession: Joi.string(),
    fee: Joi.number()
  });

  Joi.assert(payload, schema);
}
// async function professionalValidateSchema(payload) {
//   const schema = Joi.object()({
//     name: Joi.string().required(),
//     lastName: Joi.string().required(),

//     email: Joi.string()
//       .email()
//       .required(),
//     password: Joi.string()
//       .regex(/^[a-zA-Z0-9]{3,30}$/)
//       .required(),
//     profession: Joi.string().required(),
//     city: Joi.string().required(),
//     fee: Joi.number().required()
//   });

//   Joi.assert(payload, schema);
// }
async function createAccount(req, res, next) {
  const accountData = {
    ...req.body
  };

  // const selectedSchema = async accountData => {
  //   if (accountData.fee & accountData.profession & accountData.city) {
  //     await professionalValidateSchema(accountData);
  //   }
  //   await userValidateSchema(accountData);
  // };
  try {
    await userValidateSchema(accountData);
    console.log(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const now = new Date();

  const createdAt = now
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");

  const securePassword = await bcrypt.hash(accountData.password, 10);
  const connection = await mysqlPool.getConnection();

  const sqlInsercion = "INSERT INTO Users SET ?";

  try {
    await connection.query(sqlInsercion, {
      Name: accountData.name,
      LastName: accountData.lastName,
      Email: accountData.email,
      password: securePassword,

      CreatedAt: createdAt
    });

    // let [rows] = await connection.query(
    //   `SELECT idUser FROM Users WHERE Email="${accountData.email}"`
    // );
    // let idUserGetted = [rows][0][0].idUser;

    // console.log(`" ${accountData.profession}","${userId}"`);
    // accountData.profession = parseInt(accountData.profession);
    // accountData.city = parseInt(accountData.city);
    // accountData.fee = parseInt(accountData.fee);
    // idUserGetted = parseInt(idUserGetted);
    // console.log(userId);
    // console.log(
    //   `"${accountData.profession}","${accountData.city}","${accountData.fee}","${accountData.profession}","${idUserGetted}"`
    // );

    // await connection.query("INSERT INTO `Professionals` SET ?", {
    //   idProfession: accountData.profession,
    //   idCity: accountData.city,
    //   idUser: idUserGetted,
    //   Fee: accountData.fee
    // });

    connection.release();

    return res.status(201).send(res => {
      console.log("REGISTRAU");
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }

    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).send({
        message: e.message
      });
    }

    console.error(e);
    return res.status(500).send(e.message);
  }
}

module.exports = createAccount;
