import './App.css';
import React from 'react';
import Package from "./components/Package"
import Search from "./components/Search"
import Header from "./components/Header"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path = '/' element={<Search/>} />
        <Route path = '/package=trackingNumber' element={<Package/>} />
      </Routes>
    </Router>
  );
}

export default App;
