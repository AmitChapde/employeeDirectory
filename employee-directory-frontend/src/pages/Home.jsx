import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const formRef = useRef(null);

  const fetchAll = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await API.get("/");
      setEmployees(res.data || []);
    } catch (err) {
      setError("Failed to fetch employees: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (data) => {
    try {
      setError("");
      setSuccess("");
      setSubmitting(true);
      if (editing) {
        await API.put(`/${editing._id}`, data);
        setSuccess("Employee updated successfully!");
        setEditing(null);
      } else {
        await API.post("/", data);
        setSuccess("Employee added successfully!");
      }
      if (formRef.current) formRef.current.reset();
      setShowForm(false);
      setTimeout(() => {
        fetchAll();
        setSuccess("");
      }, 500);
    } catch (err) {
      setError("Failed to save employee: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteEmp = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      setError("");
      setSuccess("");
      setDeleting(id);
      await API.delete(`/${id}`);
      setSuccess("Employee deleted successfully!");
      setTimeout(() => {
        fetchAll();
        setSuccess("");
      }, 500);
    } catch (err) {
      setError("Failed to delete employee: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (emp) => {
    setEditing(emp);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
    setError("");
  };

  const toggleForm = () => {
    if (showForm) {
      handleCancel();
    } else {
      setShowForm(true);
      setEditing(null);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">Employee Directory</h1>
          <button
            onClick={toggleForm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            {showForm ? "Cancel" : "+ Add Employee"}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg animate-pulse">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg animate-pulse">
            {success}
          </div>
        )}

        {showForm && (
          <EmployeeForm
            ref={formRef}
            onSubmit={submit}
            defaultValues={editing || {}}
            onCancel={handleCancel}
            isSubmitting={submitting}
          />
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={deleteEmp}
            isDeleting={deleting}
          />
        )}
      </div>
    </div>
  );
}
