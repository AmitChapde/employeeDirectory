const Employee = require("../models/employee.model");

exports.getAll = () => Employee.find();

exports.getOne = (id) => Employee.findById(id);

exports.create = (data) => Employee.create(data);

exports.update = (id, data) =>
  Employee.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) => Employee.findByIdAndDelete(id);
