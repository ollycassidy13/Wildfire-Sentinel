import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const wildfireIcon = new L.Icon({
  iconUrl: '/wildfire-icon.png', 
  iconSize: [25, 25],
});

const WildfireMarker = ({ lat, lng, text, location, date }) => {
  return (
    <Marker position={[lat, lng]} icon={wildfireIcon}>
      <Popup>
        <div>
          <h3>🔥 {text}</h3>
          <p><strong>📍 Location:</strong> {location || 'Unknown'}</p>
          <p><strong>📆 Date:</strong> {date || 'No Date Available'}</p>
          <p><strong>🌍 Coordinates:</strong> {lat.toFixed(2)}, {lng.toFixed(2)}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default WildfireMarker;
