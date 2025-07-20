import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun, LogOut } from "lucide-react";

const Navbar = ({ isDark, toggleDarkMode, handleLogout }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">My Budget</h1>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={toggleDarkMode}>
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
