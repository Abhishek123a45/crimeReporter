import React, { useEffect, useState } from "react";
import SearchBox from "./search";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import SafetyMap from "./SafetyMap"; 
import Carousel from "./slider";

export default function Crimedata() {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [location, setLocation] = useState(null);
  const [isSafe, setIsSafe] = useState(null);


  useEffect(()=>{
    getData3()
  },[])

  const handleSearch = async (searchParams) => {
    console.log('Search params:', searchParams);

    if(searchParams.searchType === 'district'){
      await getData(searchParams.searchTerm);
    }
    else{
      await getData2(searchParams.searchTerm);
    }
    setLocation(searchParams.searchTerm);
  };

  const getData = async (district) => {
    try {
      const response = await axios.get(`/api/test-db?district=${district}`);
      console.log(response.data);
      setData(response.data.data);
      
      // Check if data is available before determining safety
      if (response.data.data && response.data.data.length > 0) {
        const safety = await determineSafety(district);
        console.log("Safety determined:", safety); // Log safety result
        setIsSafe(safety);
      } else {
        setIsSafe(false);
        window.alert("No data found for the district. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching district data:", error);
      window.alert("Something went wrong. Please try again.");
    }
  }

  const getData2 = async (state) => {
    try {
      const response = await axios.get(`/api/test-db2?state_ut=${state}`);
      console.log('State data:', response.data);
      setData(response.data.data);
      
      // Check if data is available before determining safety
      if (response.data.data && response.data.data.length > 0) {
        const safety = await determineSafety2(state);
        console.log("Safety determined for state:", safety); // Log safety result
        setIsSafe(safety);
      } else {
        setIsSafe(false);
        window.alert("No data found for the state. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching state data:", error);
      window.alert("Something went wrong. Please try again.");
    }
  }

  const getData3 = async () => {
    try {
      const response = await axios.get(`/api/report`);
      console.log("The is reponse 3 ",response.data);
      setData2(response.data.data);
      
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong. Please try again.");
    }
  }

  // Function to determine safety based on the data
  const determineSafety = async (district) => {
    if (!data || data.length === 0) {
      return false;
    }

    try {
      const response = await axios.get(`/api/test-db3?district=${district}`);
      const avgCrimes = Number(response.data.data[0].avg_crimes);
      console.log(`Average crimes in ${district}: ${avgCrimes}`);
      console.log(`Safety data for ${district}: ${avgCrimes < 10000 ? 'safe' : 'not safe'}`);

      return avgCrimes < 12000;

    } catch (error) {
      console.error(error);
      window.alert("Something went wrong. Please try again.");
    }
    
  }


  const determineSafety2 = async (state) => {
    if (!data || data.length === 0) {
      return false;
    }

    try {
      const response = await axios.get(`/api/test-db4?state=${state}`);
      const avgCrimes = Number(response.data.data[0].avg_crimes);
      console.log(`Average crimes in ${state}: ${avgCrimes}`);
      console.log(`Safety data for ${state}: ${avgCrimes < 11000 ? 'safe' : 'not safe'}`);

      return avgCrimes < 12000;

    } catch (error) {
      console.error(error);
      window.alert("Something went wrong. Please try again.");
    }
    
  }

  return (
    <div>
      <div className='mt-10 mb-10'>
        <Carousel/>
      </div>

      <div className="mb-24">
        <SearchBox onSearch={handleSearch} />
      </div>

      <div className="mt-20">
        <h1 className="text-2xl font-bold mb-6 underline text-yellow-500 text-left">Map</h1>
        <SafetyMap location={location} isSafe={isSafe} data2={data2} />
      </div>
    
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