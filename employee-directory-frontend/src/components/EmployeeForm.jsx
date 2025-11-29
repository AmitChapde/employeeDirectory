import { useForm } from "react-hook-form";

export default function EmployeeForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white shadow-md rounded-xl space-y-4">
      <input className="input" placeholder="Name" {...register("name", { required: true })} />
      <input className="input" placeholder="Department" {...register("department", { required: true })} />
      <input className="input" placeholder="Role" {...register("role", { required: true })} />
      <input className="input" type="number" placeholder="Age" {...register("age", { required: true })} />
      <input className="input" placeholder="Contact" {...register("contact", { required: true })} />
      <input className="input" type="date" {...register("joiningDate", { required: true })} />

      <button className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
    </form>
  );
}
