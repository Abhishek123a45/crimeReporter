import React, { useState } from "react";
import SearchBox from "./search";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import SafetyMap from "./SafetyMap"; // Import the new SafetyMap component
import Carousel from "./slider";

export default function Crimedata() {

  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [isSafe, setIsSafe] = useState(null);

  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);

    if(searchParams.searchType === 'district'){
      getData(searchParams.searchTerm);
    }
    else{
      getData2(searchParams.searchTerm);
    }
    setLocation(searchParams.searchTerm);
  };

  async function getData(district) {
    try {
      const response = await axios.get(`/api/test-db?district=${district}`);
      console.log(response.data);
      setData(response.data.data);
      // Determine safety based on the data
      if (response.data.data && response.data.data.length > 0) {
        setIsSafe(determineSafety(response.data.data));
      } else {
        setIsSafe(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getData2(state) {
    try {
      const response = await axios.get(`/api/test-db2?state_ut=${state}`);
      console.log(response.data);
      setData(response.data.data);
      // Determine safety based on the data
      if (response.data.data && response.data.data.length > 0) {
        setIsSafe(determineSafety(response.data.data));
      } else {
        setIsSafe(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to determine safety based on the data
  function determineSafety(data) {
    if (!data || data.length === 0) {
      return null;
    }
    const latestYear = data[data.length - 1];
    const totalCrimes = Object.values(latestYear).reduce((sum, value) => sum + (typeof value === 'number' ? value : 0), 0);
    return totalCrimes > 5000; // Example threshold
  }

  return (
    <div>
      <div className='mt-10 mb-10'>
          
          <Carousel/>
  
        </div>

        <div className="mb-24">
         <SearchBox onSearch={handleSearch} />

        </div>

    {location && (
      <div className="mt-20">
        <h1 className="text-2xl font-bold mb-6 underline text-yellow-500 text-left">Map</h1>
        <SafetyMap location={location} isSafe={isSafe}/>
      </div>
    )}
    
    {data && data.length > 0 && (
      <div>
        <h1 className="text-2xl font-bold mt-10 mb-3 underline text-yellow-500 text-left">Graph</h1>
        <ResponsiveContainer width="100%" height={650} className='mt-20'> 
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="12 12" />
            <XAxis dataKey="years"/>
            <YAxis/>
            <Legend />

            <Tooltip content={({ payload, label }) => {
              if (payload && payload.length) {
                const activePayload = payload.filter(entry => entry.payload.years === label);
                return (
                  <div className="custom-tooltip">
                    {activePayload.map((entry, index) => (
                      <p key={index}>{`${entry.name}: ${entry.value}`}</p>
                    ))}
                  </div>
                );
              }
              return null;
            }}/>

            {Object.keys(data[0] || {}).filter(key => key !== 'years' && key !== 'district' && key !== 'state_ut').map((key, index) => (
              <Line key={index} type="monotone" dataKey={key} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
      
      
    </div>
  );
}