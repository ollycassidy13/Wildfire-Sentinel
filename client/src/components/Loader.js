import { useState, useEffect } from 'react'
import spinner from './spinner.gif'
import './Loader.css'

const Loader = ({ isDataReady, serverAwake, onLoadComplete }) => {
    const [progress, setProgress] = useState(0)
    const [useSpinner, setUseSpinner] = useState(serverAwake)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        console.log('Effect triggered:', { 
            isDataReady, 
            serverAwake, 
            useSpinner, 
            progress,
            isAnimating 
        });

        let intervalId
        let timeoutId

        if (serverAwake && !useSpinner) {
            console.log('Server is awake - switching to spinner');
            setUseSpinner(true);
            if (isDataReady) {
                onLoadComplete();
            }
            return;
        }

        if (isAnimating) {
            return;
        }

        if (isDataReady && !useSpinner && !serverAwake) {
            console.log('Data arrived early - animating to 100%');
            setIsAnimating(true);
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            
            setProgress(100);
            
            const completeTimeout = setTimeout(() => {
                setIsAnimating(false);
                onLoadComplete();
            }, 500);
            
            return () => clearTimeout(completeTimeout);
        }
        
        if (!useSpinner && !serverAwake && !isAnimating) {
            const updateProgress = () => {
                setProgress(prev => {
                    const increment = Math.random() * 4 + 1;
                    const newProgress = prev + increment;
                    
                    if (newProgress >= 100) {
                        setUseSpinner(true);
                        clearInterval(intervalId);
                    }
                    
                    return Math.min(newProgress, 100);
                });
            };

            console.log('Starting progress updates');
            intervalId = setInterval(updateProgress, 1000);

            timeoutId = setTimeout(() => {
                console.log('60s timeout reached - switching to spinner');
                setUseSpinner(true);
                clearInterval(intervalId);
            }, 60000);

            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        }
    }, [isDataReady, serverAwake, useSpinner, onLoadComplete, isAnimating]);

    useEffect(() => {
        if (isDataReady && useSpinner) {
            console.log('Data ready and using spinner - completing');
            onLoadComplete();
        }
    }, [isDataReady, useSpinner, onLoadComplete]);

    console.log('Render:', { progress, useSpinner, isDataReady, serverAwake });

    return (
        <div className="loader">
            {useSpinner ? (
                <>
                    <img src={spinner} alt="Loading" />
                    <h1>Fetching Data</h1>
                </>
            ) : (
                <>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill"
                            style={{ 
                                width: `${progress}%`,
                                transition: 'width 0.5s ease-in-out'
                            }}
                        ></div>
                    </div>
                    <h1>Waking up server... {Math.round(progress)}%</h1>
                </>
            )}
        </div>
    );
};

export default Loader;
