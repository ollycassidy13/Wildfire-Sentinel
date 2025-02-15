import React from 'react';

const Header = () => {
    return (
        <header className="header" style={{
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#222', 
            padding: '10px 20px'
        }}>
            <img 
                src="/wildfire-icon.png" 
                alt="Fire Icon" 
                style={{ width: '40px', height: '40px', marginRight: '10px' }} 
            />
            <h1 style={{ margin: 0, fontSize: '24px', color: 'white' }}>
                Wildfire Sentinel (Data From NASA)
            </h1>
        </header>
    );
};

export default Header;
