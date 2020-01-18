"use strict";

const router = require("express").Router({ mergeParams: true });
const checkAccountSesion = require("./../controllers/account/check-account-session");

const payments = require("./../controllers/Payments/event-payment");
router.post("/", checkAccountSesion, payments);
module.exports = router;
