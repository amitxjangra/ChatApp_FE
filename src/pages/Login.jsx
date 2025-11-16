import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useSocket from "../hooks/useWebSocket";

import { login } from "../controllers/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { connectSocket } = useSocket();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email or Username is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem("user_id", response.user.id);
      connectSocket();
      navigate("/chats", { replace: true });
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all hover:shadow-2xl">
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Welcome Back
          </h2>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {errors.submit && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center animate-fade-in">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 transition-all duration-300 group-focus-within:text-indigo-600"
            >
              Email Address or Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300">
                ✉️
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 group-hover:border-indigo-300"
                } rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all duration-300 shadow-sm`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            {errors.email && (
              <p className="mt-2 text-xs text-red-600 animate-fade-in">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2 transition-all duration-300 group-focus-within:text-indigo-600"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300">
                🔒
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 group-hover:border-indigo-300"
                } rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all duration-300 shadow-sm`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            {errors.password && (
              <p className="mt-2 text-xs text-red-600 animate-fade-in">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed transform hover:-translate-y-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
