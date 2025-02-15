import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import WildfireMarker from './WildfireMarker';

const OSMMap = ({ eventData, center = { lat: 0, lng: 0 }, zoom = 2 }) => {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={zoom} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <ZoomControl position="bottomright" />

      {eventData.map((ev, idx) => {
        if (!ev.geometry || ev.geometry.length === 0) return null;
        
        const [lng, lat] = ev.geometry[0].coordinates;
        const location = ev.sources && ev.sources.length > 0 ? ev.sources[0].id : 'Unknown';
        const date = ev.geometry[0].date ? new Date(ev.geometry[0].date).toLocaleDateString() : 'No Date';

        return <WildfireMarker key={idx} lat={lat} lng={lng} text={ev.title} location={location} date={date} />;
      })}
    </MapContainer>
  );
};

export default OSMMap;
