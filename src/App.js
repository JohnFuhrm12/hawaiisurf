import './App.css';
import {useState, useEffect} from 'react';

import HomeScreen from './HomeScreen';
import Forecasts from './Forecasts';

function App() {
    const [home, setHome] = useState(true);
    const [forecasts, setForecasts] = useState(false);

    const props = { 
        home,
        setHome,
        forecasts,
        setForecasts,
    }

    return (
    <>
        {home ? <HomeScreen {...props}/> : <></>}
        {forecasts? <Forecasts {...props}/> : <></>}
    </>
    );
}

export default App;