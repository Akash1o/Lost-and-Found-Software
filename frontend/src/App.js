import React, { useState, useEffect } from 'react';
import Nav from './component/Nav';
import Footer from './component/Footer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Lost from './pages/Lost';
import ReportLost from './pages/ReportLost';
import Found from './pages/Found';
import ReportFound from './pages/ReportFound';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Login from './pages/Login';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session status when the app loads
  useEffect(() => {
    // Simulate a session check on page load
    axios
      .get('http://localhost/backend/SessionMan.php') // Backend session check
      .then((response) => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true); // If session is active, set as logged in
        }
      })
      .catch((error) => {
        console.error('Error checking session', error);
      });
  }, []);



  return (
    <div className="App">
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/create"  element={<Create />} />

          {/* Public Routes */}
          <Route path="lost" element={isLoggedIn ? <Lost /> : <Navigate to="/login" />} />
          <Route path="reportlost" element={isLoggedIn ? <ReportLost /> : <Navigate to="/login" />} />
          <Route path="found" element={isLoggedIn ? <Found /> : <Navigate to="/login" />} />
          <Route path="reportfound" element={isLoggedIn ? <ReportFound /> : <Navigate to="/login" />} />

          <Route path="profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />


          {/* Login Route */}
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
