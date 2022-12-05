import './App.css';
import {useState, useEffect} from 'react';

import HomeScreen from './HomeScreen';

function App() {
    const [home, setHome] = useState(true);

    const props = { 
        home,
        setHome,
    }

    return (
    <>
        {home ? <HomeScreen {...props}/> : <></>}
    </>
    );
}

export default App;