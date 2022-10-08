// TODO finish this

const router = require("express").Router();
const homeRoutes = require("./homePage");
const apiRoutes = require("./api");
const veggieRoutes = require("./Veggies");
const requestRoutes = require("./Requests");

router.use("/", homeRoutes);

router.use("/veggies", veggieRoutes);
router.use("/requests", requestRoutes);
router.use("/api", apiRoutes);

module.exports = router;