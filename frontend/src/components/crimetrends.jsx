import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from './slider';

function CrimeTrends() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  async function getTrends(){
    try{
      const response = await axios.get('api/criminaltrends');
      setTrends(response.data.data);
      console.log(response.data);
    }catch(error){
      console.error('There was an error fetching the trends data!', error);
    }
  }


  return (
    <div>
      <h2 className='text-2xl font-bold mb-8'>Crime Trends</h2>

      

      {trends.length > 0 ? (
        <div className="trends-container">
          {trends.map((trend, index) => (
            <div key={index} className="trend-card ">
              <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg pl-5" src={trend.image} alt=""/>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{trend.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{trend.description}</p>
                    </div>
            </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading trends...</p>
      )}
    </div>
  );
}

export default CrimeTrends;

