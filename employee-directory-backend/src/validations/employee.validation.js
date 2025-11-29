const Joi = require("joi");

exports.employeeSchema = Joi.object({
  name: Joi.string().required(),
  department: Joi.string().required(),
  role: Joi.string().required(),
  contact: Joi.string().required(),
  age: Joi.number().min(18).required(),
  joiningDate: Joi.date().required()
});
