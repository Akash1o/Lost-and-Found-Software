import React, { use, useState } from "react";
import log from "../images/log.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Create() {
  const Navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    idNumber: "",
    faculty: "",
    contact: "",
    email: "",
    password: "",
  });
  const handleForm = async (e) => {
    e.preventDefault();
    const { fullname,idNumber,faculty,contact, email, password } = input;

    if (!fullname || !email || !password || !faculty ||!idNumber ||!contact) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const LoginData = new FormData();
      LoginData.append("fullname", fullname);
      LoginData.append("idNumber", idNumber);
      LoginData.append("faculty", faculty);
      LoginData.append("contact", contact);
      LoginData.append("email", email);
      LoginData.append("password", password);

      const response = await axios.post(
        "http://localhost/backend/Create.php",
        LoginData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        setInput({
          fullname: "",
          idNumber: "",
          faculty: "",
          contact: "",
          email: "",
          password: "",
        });
      }
      console.log(response);
    } catch (error) {
      console.error("erro in submitting :", error);
      alert("Failed to submit the form. Please try again!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleLogin = () => {
    Navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100  flex justify-center items-center ">
      <div className="flex border-2 border-gray-800 bg-gray-600 w-[90%] max-w-[1000px] mt-4 mb-4 rounded-xl shadow-lg">
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
        <div className="flex-col p-8 w-full md:w-1/2 bg-white border-2 border-black rounded-3xl">
          <p className="font-bold text-lg text-center">Create Account</p>

          <form onSubmit={handleForm} className="flex flex-col mt-4">
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              placeholder="FullName"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="idNumber"
              value={input.idNumber}
              placeholder="Type your id Number"
              onChange={handleChange}
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="faculty"
              value={input.faculty}
              onChange={handleChange}
              placeholder="faculty"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="contact"
              value={input.contact}
              onChange={handleChange}
              placeholder="contact"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="email"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />

            <button className="bg-blue-600 text-white p-2 rounded-md">
              Create Account
            </button>
          </form>
          <button
            onClick={handleLogin}
            className="bg-red-600 w-full text-white p-2 rounded-md mt-3 shadow-sm"
          >
            Login Your Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
