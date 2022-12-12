import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import img1 from './static/pipeF.jpg';

function ForecastInfo( {...props} ) {
  const [swellWaveHeightsMinMeters, setSwellWaveHeightsMinMeters] = useState(0);
  const [swellWaveHeightsMaxMeters, setSwellWaveHeightsMaxMeters] = useState(0);

  const [swellWaveHeightsMinFeet, setSwellWaveHeightsMinFeet] = useState(0);
  const [swellWaveHeightsMaxFeet, setSwellWaveHeightsMaxFeet] = useState(0);

  const [windWaveHeightsMinMeters, setWindWaveHeightsMinMeters] = useState(0);
  const [windWaveHeightsMaxMeters, setWindWaveHeightsMaxMeters] = useState(0);

  const [windWaveHeightsMinFeet, setWindWaveHeightsMinFeet] = useState(0);
  const [windWaveHeightsMaxFeet, setWindWaveHeightsMaxFeet] = useState(0);

  const [waveHeightsMinFeetRounded, setWaveHeightsMinFeetRounded] = useState(0);
  const [waveHeightsMaxFeetRounded, setWaveHeightsMaxFeetRounded] = useState(0);

  const [waveDirectionDegrees, setWaveDirectionDegrees] = useState(0);
  const [waveDirectionCompass, setWaveDirectionCompass] = useState("ENE");
  const [wavePeriodSeconds, setWavePeriodSeconds] = useState(0);



  var day = 0;
  var month = 0;
  var year = 0;

  useEffect(() => {
    var today = new Date();
    day = String(today.getDate()).padStart(2, '0');
    month = String(today.getMonth() + 1).padStart(2, '0'); 
    year = today.getFullYear();
    getData();
  }, [])

  useEffect(() => {
    setWaveHeight();
  })

  // Call Open-Meteo API
  const getData = () => {
      axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=21.67&longitude=-158.05&hourly=wave_direction,wind_wave_height,wave_period,swell_wave_height&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`).then((res) => { // Pipeline TODAY ONLY
        const swellWaveHeights = res.data.hourly.swell_wave_height;
        const windWaveHeights = res.data.hourly.wind_wave_height;
        const waveDirection = res.data.hourly.wave_direction[0];
        const wavePeriod = res.data.hourly.wave_period[0];

        setWaveDirectionDegrees(waveDirection);
        setWavePeriodSeconds(wavePeriod);

        setSwellWaveHeightsMinMeters(Math.min(...swellWaveHeights).toFixed(2));
        setSwellWaveHeightsMaxMeters(Math.max(...swellWaveHeights).toFixed(2));

        setWindWaveHeightsMinMeters(Math.min(...windWaveHeights).toFixed(2));
        setWindWaveHeightsMaxMeters(Math.max(...windWaveHeights).toFixed(2));

        setSwellWaveHeightsMinFeet((Math.min(...swellWaveHeights) * 3.28084).toFixed(2));
        setSwellWaveHeightsMaxFeet((Math.max(...swellWaveHeights) * 3.28084).toFixed(2));

        setWindWaveHeightsMinFeet((Math.min(...windWaveHeights) * 3.28084).toFixed(2));
        setWindWaveHeightsMaxFeet((Math.max(...windWaveHeights) * 3.28084).toFixed(2));

        if (waveDirection === 0) {
          setWaveDirectionCompass("N")
        }
        if (waveDirection > 0 && waveDirection < 45) {
          setWaveDirectionCompass("NNE")
        }
        if (waveDirection === 45) {
          setWaveDirectionCompass("NE")
        }
        if (waveDirection > 45 && waveDirection < 90) {
          setWaveDirectionCompass("ENE")
        }
        if (waveDirection === 90) {
          setWaveDirectionCompass("E")
        }
        if (waveDirection > 90 && waveDirection < 135) {
          setWaveDirectionCompass("ESE")
        }
        if (waveDirection === 135) {
          setWaveDirectionCompass("SE")
        }
        if (waveDirection > 135 && waveDirection < 180) {
          setWaveDirectionCompass("SSE")
        }
        if (waveDirection === 180) {
          setWaveDirectionCompass("S")
        }
        if (waveDirection > 180 && waveDirection < 225) {
          setWaveDirectionCompass("SSW")
        }
        if (waveDirection === 225) {
          setWaveDirectionCompass("SW")
        }
        if (waveDirection > 225 && waveDirection < 270) {
          setWaveDirectionCompass("WSW")
        }
        if (waveDirection === 270) {
          setWaveDirectionCompass("W")
        }
        if (waveDirection > 270 && waveDirection < 315) {
          setWaveDirectionCompass("WNW")
        }
        if (waveDirection === 315) {
          setWaveDirectionCompass("NW")
        }
        if (waveDirection > 315) {
          setWaveDirectionCompass("NNW")
        }
      }
    );
  };

  function setWaveHeight() {
    // Set Predicted Wave Height to wind, or swell depending on if swell direction is correct
    if (waveDirectionDegrees > 260 && waveDirectionDegrees < 360) {
      setWaveHeightsMinFeetRounded(Math.round(swellWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(swellWaveHeightsMaxFeet));
    }
    else {
      setWaveHeightsMinFeetRounded(Math.round(windWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(windWaveHeightsMaxFeet));
    }
  }

  function showHome() {
    props.setHome(true)
    props.setForecastInfo(false)
  }

  function showForecasts() {
    props.setForecasts(true)
    props.setForecastInfo(false)
  }

  return (
    <>
    <div className='page'>
      <div className='navbar'>
        <h1 onClick={showHome} className='navHome'>Hawai'i Surf</h1>
        <div className='navbarRight'>
          <h1 onClick={showForecasts} className='navbarItem'>Forecasts</h1>
          <h1 className='navbarItem'>Favorites</h1>
          <h1 className='navbarItem'>Login</h1>
          <h1 className='navbarItem'>Sign Up</h1>
        </div>
      </div>
      <div className='forecastInfoVerticalWrapper'>
        <div className='forecastInfoWrapper'>
            <div className='forecastTitleBlock'>
                <h1 className='forecastInfoTitle'>CURRENT CONDITIONS: PIPELINE</h1>
                <img className='forecastInfoIMG' src={img1} alt='Pipeline'/>
            </div>
            <div className='mainForecastBlock'>
                <h2 className='heightTitle'>Surf Height</h2>
                <div className='surfHeightBubble'>
                    <h2 className='surfHeight'>{waveHeightsMinFeetRounded}-{waveHeightsMaxFeetRounded} ft. - Fair</h2>
                </div>
                <div className='forecastTextWrapper'>
                <p className='forecastText'>The Banzai Pipeline is a reef break located in Hawaii, off Ehukai Beach Park in Pupukea on O'ahu's North Shore. Pipeline is known for huge waves that break in shallow water just above a sharp and cavernous reef, forming large, hollow, thick curls of water that surfers can tube ride. There are three reefs at Pipeline in progressively deeper water that activate according to the increasing size of swell.</p>
                </div>
            </div>
        </div>
        <div className='forecastInfoSecondColumnWrapper'>
            <div className='swellWindBlock'>
                <h2 className='swellWindTitle'>SWELL AND WIND</h2>
                <h2 className='swellTitle'>Primary Swell</h2>
                <h2 className='swellWindDetails'>Wave Height (FT.): {swellWaveHeightsMaxFeet} ft. at {wavePeriodSeconds} seconds {waveDirectionCompass} @ {waveDirectionDegrees}°</h2>
                <h2 className='swellWindDetails'>Wave Height (M): {swellWaveHeightsMaxMeters} m. at 9 seconds ENE @ 50°</h2>
                <h2 className='swellTitle'>Wind Swell</h2>
                <h2 className='swellWindDetails'>Wave Height (FT.): {windWaveHeightsMaxFeet} ft. at {wavePeriodSeconds} seconds {waveDirectionCompass} @ {waveDirectionDegrees}°</h2>
                <h2 className='swellWindDetails'>Wave Height (M): {windWaveHeightsMaxMeters} m. at 9 seconds ENE @ 50°</h2>
                <h2 className='windTitle'>Wind Direction</h2>
                <h2 className='swellWindDetails'>Wind Speed (MPH): 17.9 mph. ESE @ 110°</h2>
                <h2 className='swellWindDetails'>Wind Speed (KPH): 28.8 kph. ESE @ 110°</h2>
            </div>
            <div className='weatherConditionsBlock'>
              <h2 className='conditionsTitle'>WEATHER CONDITIONS</h2>
              <h2 className='airTemp'>Air Temperature</h2>
              <h2 className='ConditionsDetails'>Fahrenheit: 89°F</h2>
              <h2 className='ConditionsDetails'>Celsius: 26°C</h2>
              <h2 className='waterTemp'>Water Temperature</h2>
              <h2 className='ConditionsDetails'>Fahrenheit: 79.34°F</h2>
              <h2 className='ConditionsDetails'>Celsius: 26.3°C</h2>
            </div>
        </div>
      </div>
      <div className='footer'>
        <h2 className='footerItem'>Hawai'i Surf</h2>
      </div>
    </div>
    </>
  );
}

export default ForecastInfo;