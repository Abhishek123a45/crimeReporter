import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import warningIcon from '../assets/warning.png';
import safeIcon from '../assets/check-mark.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const greenIcon = new L.Icon({
  iconUrl: markerIcon, // Path to your green marker icon in the public directory
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: markerIcon2x, // Path to your red marker icon in the public directory
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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

export default function SafetyMap({ location, isSafe }) {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default to center of India
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      setLoading(true);
      getCoordinates(location).then((coords) => {
        setPosition(coords);
        setLoading(false);
      });
    }
  }, [location]);

  return (
    <div style={{ height: '400px', width: '100%', zIndex: 1 }}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Loading map...</p>
        </div>
      ) : (
        <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={isSafe ? greenIcon : redIcon}>
            <Popup>
              {location} <br /> This area is {isSafe ? 'safe' : 'not safe'} based on our data.
              {!isSafe && <img src={warningIcon} alt="Warning" style={{ width: '20px', height: '20px' }} />}
              {isSafe && <img src={safeIcon} alt="Safe" style={{ width: '20px', height: '20px' }} />}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}