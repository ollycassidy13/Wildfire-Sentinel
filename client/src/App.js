import React, { useState, useEffect } from 'react';
import OSMMap from './components/OSMMap';
import Loader from './components/Loader';
import Header from './components/Header';
import Draggable from 'react-draggable';

const getFormattedDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0]; 
};

function App() {
  const [eventData, setEventData] = useState([]);
  const [startDate, setStartDate] = useState(getFormattedDate(7));
  const [endDate, setEndDate] = useState(getFormattedDate(0)); 
  const [loading, setLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setDataReady(false);
      
      const startTime = Date.now();
      
      try {
        const res = await fetch(`/api/events?start=${startDate}&end=${endDate}`);
        const data = await res.json();
        
        const responseTime = Date.now() - startTime;
        const isAwake = responseTime < 22000;
        
        setServerAwake(isAwake);
        console.log('Response time:', responseTime, 'Server awake:', isAwake);

        if (!data.events) {
          console.warn('No events found:', data);
          setEventData([]);
        } else {
          setEventData(data.events);
        }
        setDataReady(true);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventData([]);
        setDataReady(true);
      }
    };

    fetchEvents();
  }, [startDate, endDate]); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <Header />

      <Draggable>
        <div style={{
          position: 'absolute',
          top: '70px', 
          left: '20px', 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          cursor: 'grab'
        }}>
          <label><strong>Start Date:</strong></label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
          />

          <label><strong>End Date:</strong></label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ display: 'block' }}
          />
        </div>
      </Draggable>

      <div style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        {loading ? (
          <Loader 
            isDataReady={dataReady}
            serverAwake={serverAwake}
            onLoadComplete={() => setLoading(false)} 
          />
        ) : (
          <OSMMap eventData={eventData} />
        )}
      </div>
    </div>
  );
}

export default App;
