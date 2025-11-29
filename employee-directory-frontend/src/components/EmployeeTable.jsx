export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <table className="w-full text-left border shadow-md rounded-xl">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Department</th>
          <th className="p-3">Role</th>
          <th className="p-3">Age</th>
          <th className="p-3">Contact</th>
          <th className="p-3">Joining Date</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id} className="border-b hover:bg-gray-50">
            <td className="p-3">{emp.name}</td>
            <td className="p-3">{emp.department}</td>
            <td className="p-3">{emp.role}</td>
            <td className="p-3">{emp.age}</td>
            <td className="p-3">{emp.contact}</td>
            <td className="p-3">{emp.joiningDate.slice(0, 10)}</td>
            <td className="p-3 flex gap-2 justify-center">
              <button onClick={() => onEdit(emp)} className="px-3 py-1 bg-blue-500 text-white rounded">
                Edit
              </button>
              <button onClick={() => onDelete(emp._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
