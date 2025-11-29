import { useForm } from "react-hook-form";
import { forwardRef, useEffect } from "react";

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EmployeeForm = forwardRef(function EmployeeForm(
  { onSubmit, defaultValues, onCancel, isSubmitting = false },
  ref
) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          joiningDate: formatDateForInput(defaultValues.joiningDate),
          age: defaultValues.age ? Number(defaultValues.age) : undefined,
        }
      : {},
    mode: "onChange",
  });

  const joiningDate = watch("joiningDate");

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        joiningDate: formatDateForInput(defaultValues.joiningDate),
        age: defaultValues.age ? Number(defaultValues.age) : undefined,
      });
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-6 bg-white shadow-lg rounded-xl space-y-4 border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {defaultValues?._id ? "Edit Employee" : "Add New Employee"}
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter full name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Name can only contain letters and spaces",
            },
          })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Department <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.department ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter department"
          {...register("department", {
            required: "Department is required",
            minLength: { value: 2, message: "Department must be at least 2 characters" },
          })}
        />
        {errors.department && (
          <span className="text-red-500 text-sm">{errors.department.message}</span>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter role/designation"
          {...register("role", {
            required: "Role is required",
            minLength: { value: 2, message: "Role must be at least 2 characters" },
          })}
        />
        {errors.role && (
          <span className="text-red-500 text-sm">{errors.role.message}</span>
        )}
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter age"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: { value: 18, message: "Age must be at least 18" },
            max: { value: 70, message: "Age must not exceed 70" },
          })}
        />
        {errors.age && (
          <span className="text-red-500 text-sm">{errors.age.message}</span>
        )}
      </div>

      {/* Contact/Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.contact ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter phone number (e.g., +1 (123) 456-7890)"
          {...register("contact", {
            required: "Mobile number is required",
            pattern: {
              value: phoneRegex,
              message:
                "Please enter a valid phone number (format: +1 (123) 456-7890 or 1234567890)",
            },
          })}
        />
        {errors.contact && (
          <span className="text-red-500 text-sm">{errors.contact.message}</span>
        )}
      </div>

      {/* Joining Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Joining Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.joiningDate ? "border-red-500" : "border-gray-300"
          }`}
          {...register("joiningDate", {
            required: "Joining date is required",
            validate: (value) => {
              if (!value) return "Joining date is required";
              const selectedDate = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (selectedDate > today) {
                return "Joining date cannot be in the future";
              }
              return true;
            },
          })}
        />
        {errors.joiningDate && (
          <span className="text-red-500 text-sm">{errors.joiningDate.message}</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isSubmitting ? "Saving..." : "Save Employee"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
});

export default EmployeeForm;
