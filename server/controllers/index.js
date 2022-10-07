const router = require("express").Router();
const homeRoutes = require("./homePage");
const dashRoute = require("./dashboard");
const apiRoutes = require("./api");
const animalRoutes = require("./Animals");
const publicFarmRoutes = require("./publicFarm");

router.use("/", homeRoutes);

router.use("/veggies", veggieRoutes);
router.use("/requests", requestRoutes);
router.use("/api", apiRoutes);

module.exports = router;