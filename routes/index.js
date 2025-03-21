const router = require("express").Router();

router.use("/", require("./swagger"));

const helloWorld = require("../controllers/helloWorld")

router.get("/", helloWorld.setup);

router.use("/tasks", require("./tasks"));

router.use("/users", require("./users"));

module.exports = router;