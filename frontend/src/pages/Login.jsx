import React, { useState } from "react";
import log from "../images/log.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn,setIsAdmin }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle login submit
  const submit = async (e) => {
    e.preventDefault();

    const { email, password } = input;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost/backend/Login.php", {
        email,
        password,
      });

      setLoading(false);

      if (response.data.success) {
        alert(response.data.message);
        
        // Save idNumber & email in local storage
        localStorage.setItem("idNumber", response.data.idNumber);
        // localStorage.setItem("email", email);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        
        setIsLoggedIn(true);
        if(response.data.isAdmin){
          setIsAdmin(true);
          navigate("/dashboard")
        }
        else{
          setIsAdmin(false);
          navigate("/"); // Redirect to home page

        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100 h-screen flex justify-center items-center">
      <div className="flex border-2 border-gray-800 bg-gray-600 w-[90%] max-w-[1000px] h-[490px] rounded-xl shadow-lg">
        
        {/* Left Section */}
        <div className="hidden five:block">
          <div className="flex-col p-8 w-full md:w-1/2">
            <p className="ml-11 text-2xl font-bold text-red-600 mt-6">
              Get started
            </p>
            <span className="font-bold ml-11 text-yellow-300">
              Search Your Objects
            </span>
            <p className="font-bold text-gray-500 ml-11 mb-6">
              On a one-click Sign-In away.
            </p>
            <img
              src={log}
              alt="login illustration"
              className="object-contain w-full h-[373px] md:w-[400px] md:h-[373px] mx-auto"
            />
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="flex flex-col p-8 w-full md:w-1/2 bg-white border-2 border-black rounded-3xl">
          <p className="font-bold text-lg text-center">Login</p>

          <form onSubmit={submit} className="flex flex-col mt-4">
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
              required
            />

            <button
              type="submit"
              className="bg-red-600 text-white p-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            onClick={() => navigate("/create")}
            className="bg-blue-600 text-white p-2 rounded-md mt-2 w-full"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
