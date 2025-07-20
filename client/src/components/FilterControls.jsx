import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const FilterControls = ({
  selectedMonth,
  onMonthChange,
  selectedCategory,
  onCategoryChange
}) => {
  // Safely format the month input value
  const monthValue =
    selectedMonth instanceof Date && !isNaN(selectedMonth)
      ? selectedMonth.toISOString().slice(0, 7)
      : '';

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 items-center">
      <Input
        type="month"
        value={monthValue}
        onChange={(e) => {
          const date = new Date(e.target.value);
          if (!isNaN(date)) onMonthChange(date);
        }}
        className="max-w-xs"
      />
      <Input
        placeholder="Filter by category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border p-2 rounded w-full md:w-auto"
      />
    </div>
  );
};

export default FilterControls;