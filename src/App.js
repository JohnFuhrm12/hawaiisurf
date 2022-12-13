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
    const [forecastLatitude, setForecastLatitude] = useState("21.67");
    const [forecastLongitude, setForecastLongitude] = useState("-158.05");

    const pipelineLat = "21.67";
    const pipelineLong = "-158.05";
    const jawsLat = "20.9423";
    const jawsLong = "-156.2969";
    const waikikiLat = "21.29";
    const waikikiLong = "-157.84";
    const waimeaLat = "21.6415";
    const waimeaLong = "-158.0671";
    const haleiwaLat = "21.59";
    const haleiwaLong = "-158.10";
    const honoluaLat = "21.0139";
    const honoluaLong = "-156.638382";

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
        forecastLatitude,
        setForecastLatitude,
        forecastLongitude,
        setForecastLongitude,
        pipelineLat,
        pipelineLong,
        jawsLat,
        jawsLong,
        waikikiLat,
        waikikiLong,
        waimeaLat,
        waimeaLong,
        haleiwaLat,
        haleiwaLong,
        honoluaLat,
        honoluaLong
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