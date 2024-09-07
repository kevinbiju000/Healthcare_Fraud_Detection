import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import './components/styles/App.css';

function App() {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/homepage" 
          element={
            <>
              <HomePage />
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
