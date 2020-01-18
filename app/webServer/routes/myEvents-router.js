"use strict";
const router = require("express").Router();
const myEvents = require("./../controllers/interface/get-my-events-controller");
const checkAccountSesion = require("./../controllers/account/check-account-session");
const rating = require("./../controllers/rating/rate-past-events-controller");
router.get("/", checkAccountSesion, myEvents);
router.post("/", checkAccountSesion, rating);
module.exports = router;
