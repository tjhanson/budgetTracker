import React, {useEffect}  from 'react'
import { Routes, Route } from "react-router-dom";
import { useDispatch  } from 'react-redux'
import './App.css';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';

import { setBoards } from './slices/boardSlice';


function App() {

  const dispatch = useDispatch()
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December']

  useEffect(() => {
      var d = new Date()
      dispatch(setBoards(months[d.getMonth()]+'_'+d.getFullYear().toString()))
  },[])
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/overview" element={<OverviewPage />} />
    </Routes>
  );
}

export default App;