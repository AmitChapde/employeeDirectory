const router = require("express").Router();
const controller = require("../controllers/employee.controller");

router.get("/", controller.getEmployees);
router.get("/:id", controller.getEmployee);
router.post("/", controller.createEmployee);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

module.exports = router;
