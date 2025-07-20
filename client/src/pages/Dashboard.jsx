import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import FilterControls from "../components/FilterControls";
import Navbar from "../components/Navbar";
import useDarkMode from "../hooks/useDarkMode";
import { deleteTransaction } from "../services/api"; // <-- Import delete function

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isDark, toggleDarkMode] = useDarkMode();

  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/auth";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  const handleEdit = (tx) => {
    console.log("Edit clicked for transaction:", tx);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setRefresh(!refresh); 
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchTransactions();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
      />
      <div className="max-w-xl mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
        <TransactionForm onSuccess={() => setRefresh(!refresh)} />

        <FilterControls
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <TransactionList
          transactions={transactions}
          selectedMonth={selectedMonth}
          selectedCategory={selectedCategory}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}