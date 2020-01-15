"use strict";

const router = require("express").Router({ mergeParams: true });

const professionalFinder = require("./../controllers/finder/professional-finder-controller");
router.get("/", professionalFinder);
module.exports = router;
