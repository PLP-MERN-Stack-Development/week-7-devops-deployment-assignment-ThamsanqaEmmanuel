import { useState } from "react";
import { createTransaction } from "../services/api";

export default function TransactionForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "income",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      setFormData({
        amount: "",
        type: "income",
        category: "",
        description: "",
        date: "",
      });
      onSuccess();
    } catch (err) {
      console.error("Error creating transaction", err);
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow space-y-3"
    >
      <div className="flex gap-4">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border p-2 flex-1 rounded"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
