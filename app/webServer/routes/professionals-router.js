const router = require("express").Router({ mergeParams: true });
const getProfessionals = require("./../controllers/finder/get-Professionals.-controller");

router.get("/", getProfessionals);
module.exports = router;
