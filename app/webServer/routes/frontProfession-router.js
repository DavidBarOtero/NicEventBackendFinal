"use strict";
const router = require("express").Router();
const getProfession = require("./../controllers/interface/get-professions-controller");

router.get("/", getProfession);
module.exports = router;
