const service = require("../services/employee.service");
const { employeeSchema } = require("../validations/employee.validation");

exports.getEmployees = async (req, res) => {
  res.json(await service.getAll());
};

exports.getEmployee = async (req, res) => {
  res.json(await service.getOne(req.params.id));
};

exports.createEmployee = async (req, res) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) return res.status(400).json(error.details);

  res.status(201).json(await service.create(req.body));
};

exports.updateEmployee = async (req, res) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) return res.status(400).json(error.details);

  res.json(await service.update(req.params.id, req.body));
};

exports.deleteEmployee = async (req, res) => {
  await service.delete(req.params.id);
  res.json({ message: "Employee deleted" });
};
