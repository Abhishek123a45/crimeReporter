import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../App.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import warningIcon from '../assets/warning.png';
import safeIcon from '../assets/check-mark.png';
import crimespot from '../assets/Basic_red_dot.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const greenIcon = new L.Icon({
  iconUrl: safeIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const crimeDestination = new L.Icon({
  iconUrl: crimespot,
  shadowUrl: markerShadow,
  iconSize: [10, 10],
  iconAnchor: [0,0],
  popupAnchor: [1, 70],
  shadowSize: [0, 0],
  popupSize: [32, 32] 
});

async function getCoordinates(location) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      return [20.5937, 78.9629]; // Default to center of India
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return [20.5937, 78.9629]; // Default to center of India
  }
}

export default function SafetyMap({ location, isSafe, data2 }) {
  const [position, setPosition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    if (location) {
      setLoading(true);
      getCoordinates(location).then((coords) => {
        setPosition(coords);
        setLoading(false);
      });
    }
    console.log(position)
  }, [location]);

  return (
    <div style={{ height: '600px', width: '100%', zIndex: 1 }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Loading map...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">No data found. Please retry.</p>
          </div>
        )}
        {data2.length > 0 && data2.map((val, index) => (
          <Marker key={index} position={val.gmaplink.split(',').map(coord => parseFloat(coord.trim()))} icon={crimeDestination}>
            <Popup className="custom-popup"> {/* Add a custom class here */}
              <img src={`http://localhost:3000${val.image}`} alt="image" className='w-48' /> {/* Adjust width as needed */}
              <div>{val.description}</div>
            </Popup>
          </Marker>
        ))}

          {position.length>0 && <Marker position={position}>
            <Popup>
  
              {console.log("Issafe here in safery map: ", isSafe)}
              {location} <br /> This area is {isSafe ? 'safe' : 'not safe'} based on our data.
              {!isSafe && <img src={warningIcon} alt="Warning" style={{ width: '20px', height: '20px' }} />}
              {isSafe && <img src={safeIcon} alt="Safe" style={{ width: '20px', height: '20px' }} />}
            </Popup>
          </Marker>}
      </MapContainer>
    </div>
  );
}