import './App.css';
import {useState, useEffect} from 'react';

import HomeScreen from './HomeScreen';
import Forecasts from './Forecasts';
import ForecastInfo from './ForecastInfo';
import Login from './Login';
import useLocalStorage from "./useLocalStorage";

function App() {
    const [home, setHome] = useState(true);
    const [forecasts, setForecasts] = useState(false);
    const [forecastInfo, setForecastInfo] = useState(false);
    const [login, setLogin] = useState(false);

    const [name, setName] = useLocalStorage();

    const [forecastLocation, setForecastLocation] = useState("Pipeline");

    const props = { 
        home,
        setHome,
        forecasts,
        setForecasts,
        forecastInfo,
        setForecastInfo,
        login, 
        setLogin,
        name,
        forecastLocation,
        setForecastLocation,
    }

    return (
    <>
        {home ? <HomeScreen {...props}/> : <></>}
        {forecasts ? <Forecasts {...props}/> : <></>}
        {forecastInfo ? <ForecastInfo {...props}/> : <></>}
        {login ? <Login {...props} onNameSubmit={setName}/> : <></>}
    </>
    );
}

export default App;