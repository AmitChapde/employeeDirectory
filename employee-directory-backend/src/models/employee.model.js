const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    contact: { type: String, required: true },
    age: { type: Number, required: true },
    joiningDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
