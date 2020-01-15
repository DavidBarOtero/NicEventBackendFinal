"use strict";

require("dotenv").config();
const webServer = require("./app/webServer/index.js");
const mysqlPool = require("./app/database/mysqlPool");

const httpPort = process.env.PORT;

async function initApp() {
  try {
    await mysqlPool.connect();
    await webServer.listen(httpPort);
    console.log(`server running at port: ${httpPort}`);
  } catch (e) {
    console.error(e);

    process.exit(1);
  }
}

initApp();
