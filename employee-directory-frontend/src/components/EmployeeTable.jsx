export default function EmployeeTable({ employees, onEdit, onDelete, isDeleting = null }) {
  if (!employees || employees.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
        <p className="text-lg">No employees found</p>
        <p className="text-sm">Click "Add Employee" to create the first entry</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Age</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Joining Date</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 text-gray-800 font-medium">{emp.name}</td>
              <td className="px-4 py-3 text-gray-700">{emp.department}</td>
              <td className="px-4 py-3 text-gray-700">{emp.role}</td>
              <td className="px-4 py-3 text-gray-700">{emp.age}</td>
              <td className="px-4 py-3 text-gray-700">{emp.contact}</td>
              <td className="px-4 py-3 text-gray-700">
                {new Date(emp.joiningDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(emp)}
                  disabled={isDeleting === emp._id}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(emp._id)}
                  disabled={isDeleting === emp._id}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1"
                >
                  {isDeleting === emp._id ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
