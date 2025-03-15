import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Nav from './component/Nav';
import Footer from './component/Footer';
import Home from './pages/Home';
import Lost from './pages/Lost';
import ReportLost from './pages/ReportLost';
import Found from './pages/Found';
import ReportFound from './pages/ReportFound';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Get current location
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    axios
      .get('http://localhost/backend/SessionMan.php')
      .then((response) => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);

          // Check if the logged-in user is "admin@gmail.com"
          const userEmail = localStorage.getItem("isAdmin");
          if (userEmail === "admin@gmail.com") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      })
      .catch((error) => {
        console.error('Error checking session', error);
      });
  }, [isLoggedIn]);

  return (
    <>
 
      {!isDashboard && <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/create" element={<Create />} />

    
        <Route path="/lost" element={isLoggedIn ? <Lost /> : <Navigate to="/login" />} />
        <Route path="/reportlost" element={isLoggedIn ? <ReportLost /> : <Navigate to="/login" />} />
        <Route path="/found" element={isLoggedIn ? <Found /> : <Navigate to="/login" />} />
        <Route path="/reportfound" element={isLoggedIn ? <ReportFound /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />} />

        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
