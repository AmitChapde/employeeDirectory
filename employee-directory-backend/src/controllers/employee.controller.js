const service = require("../services/employee.service");
const { employeeSchema } = require("../validations/employee.validation");

// GET all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await service.getAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single employee
exports.getEmployee = async (req, res) => {
  try {
    const employee = await service.getOne(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE employee
exports.createEmployee = async (req, res) => {
  try {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).json(error.details);

    const newEmployee = await service.create(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE employee
exports.updateEmployee = async (req, res) => {
  try {
    // Validate (allow unknown to prevent Joi errors)
    const { error } = employeeSchema.validate(req.body, { allowUnknown: true });
    if (error) return res.status(400).json(error.details);

    // Remove protected fields
    const updateData = { ...req.body };
    ["_id", "createdAt", "updatedAt", "__v"].forEach(field => delete updateData[field]);

    // Update in DB
    const updatedEmployee = await service.update(req.params.id, updateData);

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
