import { useState } from "react";
import { login } from "../services/api";

export default function LoginForm({ switchForm }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/"; // redirect to dashboard
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      <p className="text-sm mt-2">Don’t have an account? <button type="button" onClick={switchForm} className="text-blue-600 underline">Register</button></p>
    </form>
  );
}
