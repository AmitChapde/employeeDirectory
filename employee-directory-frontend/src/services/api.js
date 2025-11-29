import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-service-h00b.onrender.com/api/employees",
});

export default API;
