import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {showLogin ? (
          <LoginForm switchForm={() => setShowLogin(false)} />
        ) : (
          <RegisterForm switchForm={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}
