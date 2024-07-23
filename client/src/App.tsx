import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginSignup/LoginPage';
import SignupPage from './pages/LoginSignup/SignupPage';
import StackPage from './pages/StackPage/StackPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/stack/:uuid" element={<StackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
