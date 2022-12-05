import './App.css';
import {useState, useEffect} from 'react';

import HomeScreen from './HomeScreen';
import Forecasts from './Forecasts';
import ForecastInfo from './ForecastInfo';

function App() {
    const [home, setHome] = useState(true);
    const [forecasts, setForecasts] = useState(false);
    const [forecastInfo, setForecastInfo] = useState(false);

    const props = { 
        home,
        setHome,
        forecasts,
        setForecasts,
        forecastInfo,
        setForecastInfo
    }

    return (
    <>
        {home ? <HomeScreen {...props}/> : <></>}
        {forecasts ? <Forecasts {...props}/> : <></>}
        {forecastInfo ? <ForecastInfo {...props}/> : <></>}
    </>
    );
}

export default App;