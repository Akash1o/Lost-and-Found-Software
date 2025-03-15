import React, { useState } from "react";
import lost from "../images/lost.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get('http://localhost/backend/Logout.php') // Log out the user from the session
      .then(() => {
        setIsLoggedIn(false); // Update the state in App.js to log the user out
        navigate("/login"); // Redirect to the login page
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  };

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setPopUp(false); // Close the popup after navigation
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md relative">
      {/* Logo on the left */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        <img src={lost} alt="logo" className="w-10 h-10" />
        <div className="ml-2">
          <span className="font-bold text-lg">Saman Khoji</span>
          <p className="text-sm">Discover. Connect. Reclaim.</p>
        </div>
      </div>

      {/* Navigation Links (Hidden by default) */}
      {isLoggedIn && (
        <div className="hidden lg:flex gap-8 justify-center absolute left-1/2 transform -translate-x-1/2">
          <button
            className="hover:border-b-2 hover:border-green-500 px-2"
            onClick={() => handleNavigate("/")}
          >
            Home
          </button>
          <button
            className="hover:border-b-2 hover:border-green-500 px-2"
            onClick={() => handleNavigate("/lost")}
          >
            Lost
          </button>
          <button
            className="hover:border-b-2 hover:border-green-500 px-2"
            onClick={() => handleNavigate("/reportlost")}
          >
            Report Lost
          </button>
          <button
            className="hover:border-b-2 hover:border-green-500 px-2"
            onClick={() => handleNavigate("/found")}
          >
            Found
          </button>
          <button
            className="hover:border-b-2 hover:border-green-500 px-2"
            onClick={() => handleNavigate("/reportfound")}
          >
            Report Found
          </button>
          <button
            className="hover:border-b-2 hover:border-green-500 px-2"
            onClick={() => handleNavigate("/profile")}
          >
            Profile
          </button>

      
        </div>
      )}

      {/* Mobile Menu Button */}
      {isLoggedIn? <div className="block lg:hidden">
        <svg
          width="32"
          height="20"
          className="hover:cursor-pointer"
          onClick={handlePopUp}
          viewBox="0 0 32 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.25 19.5V16.3333H31.75V19.5H0.25ZM0.25 11.5833V8.41667H31.75V11.5833H0.25ZM0.25 3.66667V0.5H31.75V3.66667H0.25Z"
            fill="#1D1B20"
          />
        </svg>
      </div>:<div className="block lg:hidden">  <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
            onClick={() => handleNavigate("/login")}
          >
            Login
          </button></div>}
     

      {/* Pop-up Menu */}
      {popUp && isLoggedIn && (
        <div className="absolute top-[80px] right-4 bg-white p-4 shadow-md rounded-md">
          <ul className="flex flex-col gap-4">
            <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              Home
            </li>
            <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/lost")}
            >
              Lost
            </li>
            <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/reportlost")}
            >
              Report Lost
            </li>
            <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/found")}
            >
              Found
            </li>
            <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/reportfound")}
            >
              Report Found
            </li>
            <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/profile")}
            >
              Profile
            </li>
            {/* <li
              className="hover:border-b-2 hover:border-green-500 cursor-pointer"
              onClick={() => handleNavigate("/admin")}
            >
              Admin
            </li> */}

            <li>
            <button
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
            </li>
          </ul>
        </div>
      )}

      {/* Login/Logout Button changes according to logged-in status */}
      <div className="hidden lg:block">
        {isLoggedIn ? (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
            onClick={() => handleNavigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  
  );
};

export default Nav;
