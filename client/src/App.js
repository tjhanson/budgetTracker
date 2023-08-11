import React from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;