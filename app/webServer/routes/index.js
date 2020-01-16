"use strict";
const frontCities = require("./../routes/frontCities-router");
const frontProfession = require("./frontProfession-router");
const professionals = require("./professionals-router");
const account = require("./account-router");
const auth = require("./auth-router");
const professionalFinder = require("./professional-finder-router");
const payments = require("./../routes/payments-router");
module.exports = {
  frontCities,
  frontProfession,
  professionals,
  account,
  auth,
  professionalFinder,
  payments
};
