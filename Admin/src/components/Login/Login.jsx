import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { backendURL } from '../../App';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendURL + '/api/user/admin', { email, password });
    
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-10 py-8 max-w-md w-full transform transition-all duration-500 hover:scale-[1.02]">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Email */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
              type="email"
              placeholder="your@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;