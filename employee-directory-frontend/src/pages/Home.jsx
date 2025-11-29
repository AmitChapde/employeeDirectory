import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchAll = async () => {
    const res = await API.get("/");
    setEmployees(res.data);
  };

  const submit = async (data) => {
    if (editing) {
      await API.put(`/${editing._id}`, data);
      setEditing(null);
    } else {
      await API.post("/", data);
    }
    fetchAll();
  };

  const deleteEmp = async (id) => {
    await API.delete(`/${id}`);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container mx-auto p-5 space-y-8">
      <h1 className="text-3xl font-bold">Employee Directory</h1>

      <EmployeeForm onSubmit={submit} defaultValues={editing || {}} />

      <EmployeeTable employees={employees} onEdit={setEditing} onDelete={deleteEmp} />
    </div>
  );
}
