"use strict";

const mysql = require("mysql2/promise");
let {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,

  MYSQL_PORT,
  MYSQL_DATABASE
} = process.env;

let pool = null;

async function connect() {
  const options = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    connectionLimit: 10,
    timezone: "Z",

    multipleStatements: true
  };

  pool = mysql.createPool(options);

  try {
    const connection = await pool.getConnection();

    if (connection) {
      console.log(`pool conectado en puerto ${MYSQL_PORT}`);
      connection.release();
    }
  } catch (e) {
    console.error("mysql pool connect", e);
    throw e;
  }
}

async function getConnection() {
  if (pool === null) {
    throw new Error("debes conectar el pool primero");
  }
  const connection = await pool.getConnection();
  return connection;
}

module.exports = {
  connect,
  getConnection
};
