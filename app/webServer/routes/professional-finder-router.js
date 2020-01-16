"use strict";

const router = require("express").Router({ mergeParams: true });
const checkAccountSesion = require("./../controllers/account/check-account-session");

const professionalFinder = require("./../controllers/finder/professional-finder-controller");
router.get("/", professionalFinder);
module.exports = router;
