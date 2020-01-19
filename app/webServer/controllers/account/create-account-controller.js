"use strict";
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const mysqlPool = require("../../../database/mysqlPool");

async function validateSchema(payload) {
  const schema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  Joi.assert(payload, schema);
}

async function createAccount(req, res, next) {
  const accountData = req.body;

  console.log(accountData);

  // try {
  //   await validateSchema(accountData);
  //   console.log(accountData);
  // } catch (e) {
  //   return res.status(400).send({
  //     message: { esquema: "falla" }
  //   });
  // }

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
    console.log(accountData);

    connection.release();

    // const payloadJwt = {
    //   userId: userData.idUser
    // };

    // const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);
    // const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
    //   expiresIn: jwtExpiresIn
    // });

    // const response = {
    //   tokenOk: token,
    //   expiresIn: jwtExpiresIn
    // };

    return res.status(201).send({
      response: {
        code: 200
      }
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
