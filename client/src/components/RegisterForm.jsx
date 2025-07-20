import { useState } from "react";
import { register } from "../services/api";

export default function RegisterForm({ switchForm }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
      <p className="text-sm mt-2">Already have an account? <button type="button" onClick={switchForm} className="text-blue-600 underline">Login</button></p>
    </form>
  );
}
