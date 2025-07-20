import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const TransactionList = ({
  transactions,
  selectedMonth,
  selectedCategory,
  onEdit,
  onDelete
}) => {
  if (!Array.isArray(transactions)) return <div>No transactions found.</div>;

  const filtered = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const selectedDate = selectedMonth ? new Date(selectedMonth + "-01") : null;

    const sameMonth = selectedDate
      ? txDate.getMonth() === selectedDate.getMonth() &&
        txDate.getFullYear() === selectedDate.getFullYear()
      : true;

    const sameCategory = selectedCategory
      ? tx.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return sameMonth && sameCategory;
  });

  if (filtered.length === 0) {
    return <div className="text-gray-600 mt-4">No transactions found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {filtered.map((tx) => (
        <Card
          key={tx.id || tx._id}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
        >
          <CardContent className="py-4">
            <div className="font-semibold">{tx.description}</div>
            <div className="text-sm text-gray-500">{tx.category}</div>
            <div
              className={`text-sm ${
                tx.type === "Income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {tx.type === "Income" ? "+" : "-"} R{tx.amount}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(tx.date).toLocaleDateString()}
            </div>
            <div className="mt-2 flex gap-2">
              <Button onClick={() => onEdit(tx)} size="sm" variant="outline">
                Edit
              </Button>
              <Button
                onClick={() => onDelete(tx.id || tx._id)}
                size="sm"
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionList;