const router = require("express").Router();


const taskController = require("../controllers/tasks");
const validation = require("../middleware/validate")

router.get("/:id", taskController.getAll);

router.get("/:taskid/:userid", taskController.getSingle);

router.post("/:userId",validation.saveTask, taskController.createTask);

router.put("/:userId/:id",validation.saveTask,  taskController.updateTask);

router.delete("/:userId/:id", taskController.deleteTask);

module.exports = router;