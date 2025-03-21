const router = require("express").Router();

const helloWorld = require("../controllers/helloWorld")

router.get("/", helloWorld.setup);

router.use("/tasks", require("./tasks"));

router.use("/users", require("./users"));

module.exports = router;