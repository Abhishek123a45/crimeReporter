import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Crimedata from './components/crimedata';
import Navbar from './components/navbar';
import Report from './components/report';
import CrimeTrends from './components/crimetrends';
import './App.css'; // Make sure this import is present
import Footer from './components/footer';
import Carousel from './components/slider';
import Anonymousreport from './components/anonymousReport';

function App() {
  return (
    <Router>
      <div className="app-background w-full">
        <Navbar />


        <div className=
        "w-full border border-gray-300 mx-auto overflow-hidden md:max-w-4xl my-20 p-8 rounded-lg bg-gradient-to-r from-slate-500 to-slate-800">


          <div className="p-8">
            
            <div className=" overflow-x-auto">
              <Routes>
                <Route path="/" element={<Crimedata/>} />
                <Route path="/report" element={<Report />} />
                <Route path="/trends" element={<CrimeTrends />} />
                <Route path="/anonymousreport" element={<Anonymousreport />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>


      <Footer/>
    
    </Router>
  )
}

export default App;