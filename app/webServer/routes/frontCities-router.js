"use strict";

const router = require("express").Router();
const getCities = require("../controllers/interface/get-cties-controller");

router.get("/", getCities);

module.exports = router;
