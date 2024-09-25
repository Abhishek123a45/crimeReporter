import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Crimedata from './components/crimedata';
import Navbar from './components/navbar';
import Report from './components/report';
import CrimeTrends from './components/crimetrends';
import './App.css'; // Make sure this import is present

function App() {
  return (
    <Router>
      <div className="app-background"> {/* Add this wrapper div with the new class */}
        <Navbar />
        <div className="w-full border border-gray-300 mx-auto overflow-hidden md:max-w-4xl mt-20">
          <div className="p-8">
            
            <div className=" overflow-x-auto">
              <Routes>
                <Route path="/" element={<Crimedata/>} />
                <Route path="/report" element={<Report />} />
                <Route path="/trends" element={<CrimeTrends />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;