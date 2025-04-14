// RegisterForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { registerUser } from "../api";
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const foundErrors = validate();
      if (Object.keys(foundErrors).length > 0) {
        setErrors(foundErrors);
        triggerShake();
      } else {
        await registerUser(formData);
        alert("Registered successfully!");
        setFormData({
          full_name: "",
          username: "",
          email: "",
          password: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Reset shake after animation
  };

  const shakeAnimation = shake ? { x: [-10, 10, -10, 10, 0] } : {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 p-4 overflow-hidden relative">
      {/* Background Animated Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-700/20 rounded-full top-1/4 left-1/3 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-600/20 rounded-full bottom-1/3 right-1/4 blur-2xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, -360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Form Container */}
      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Create Account
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          animate={shakeAnimation}
        >
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-purple-400" size={20} />
            <input
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.full_name
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-purple-500 border-gray-700"
              } border transition`}
            />
            {errors.full_name && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.full_name}
              </motion.p>
            )}
          </div>

          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-purple-400" size={20} />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.username
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-purple-500 border-gray-700"
              } border transition`}
            />
            {errors.username && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.username}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-pink-400" size={20} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-pink-500 border-gray-700"
              } border transition`}
            />
            {errors.email && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-pink-400" size={20} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-pink-500 border-gray-700"
              } border transition`}
            />
            {errors.password && (
              <motion.p
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl shadow-lg transition"
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
