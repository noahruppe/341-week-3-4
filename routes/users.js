const router = require("express").Router();

const userController = require("../controllers/users");
const validation = require("../middleware/validate");

router.get("/", userController.getAll );

router.get("/:id", userController.getSingle );

router.post("/", validation.saveUser, userController.CreateUser);

router.put("/:id", validation.saveUser, userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
