"use strict";
const mysqlPool = require("./../../../database/mysqlPool");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

async function validateSchema(payload) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  Joi.assert(payload, schema);
}

async function getLogged(req, res, next) {
  const userLoginData = { ...req.body };

  console.log(userLoginData);
  try {
    await validateSchema(userLoginData);
  } catch (e) {
    return res.status(400).send(e);
  }

  try {
    const sqlQuery = `SELECT idUser,Name,LastName,Password,Email,Profession
        FROM Users 
       
        WHERE Email = '${userLoginData.email}'`;
    const connection = await mysqlPool.getConnection();
    const [result] = await connection.query(sqlQuery);
    connection.release();
    // res.send(result[0]);

    if (result.length !== 1) {
      return res.status(401).send();
    }

    // if response.data.idProfessional=null, role=user
    const userData = result[0];

    const testPasswordLogin = await bcrypt.compare(
      userLoginData.password,
      userData.Password
    );
    if (!testPasswordLogin) {
      return status(401).send();
    }

    const payloadJwt = {
      userId: userData.idUser
    };

    const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);
    const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
      expiresIn: jwtExpiresIn
    });

    const response = {
      token: token,
      expiresIn: jwtExpiresIn
    };
    console.log(response);

    return res.status(200).send(response);
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: e.message
    });
  }
}

module.exports = getLogged;
