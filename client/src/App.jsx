import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import useDarkMode from "./hooks/useDarkMode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" replace />;
};

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth"; // Redirect after logout
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard
                isDark={isDark}
                toggleDarkMode={toggleDarkMode}
                handleLogout={handleLogout}
              />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
