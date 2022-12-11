import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import img1 from './static/pipeF.jpg';

function ForecastInfo( {...props} ) {
  var day = 0
  var month = 0
  var year = 0

  useEffect(() => {
    var today = new Date();
    day = String(today.getDate()).padStart(2, '0');
    month = String(today.getMonth() + 1).padStart(2, '0'); 
    year = today.getFullYear();
    getData()
  }, [])

  const getData = () => {
      axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=21.67&longitude=-158.05&hourly=wave_height&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`).then((res) => { // Pipeline
        const waveHeights = res.data.hourly.wave_height;
        const waveHeightsMin = Math.min(...waveHeights);
        const waveHeightsMax = Math.max(...waveHeights);
        console.log(waveHeightsMin);
        console.log(waveHeightsMax);
      }
    );
  };

  useEffect(() => {
    console.log(`DAY: ${day} MONTH: ${month} YEAR: ${year}`)
  })

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
                    <h2 className='surfHeight'>4-6 ft. - Fair</h2>
                </div>
                <div className='forecastTextWrapper'>
                <p className='forecastText'>Good morning. A combo of medium-long period swell from the NW and medium-long period swell from the NNE are joining with more locally-generated wind swell from the E. End result is 4-6+ ft surf with a dominant wave period of 11 seconds. As of 10:10 AM wind is moderate and cross/sideshore from the ENE (70) at 6 mph. A 0.4' low tide at 7:26 AM rises to a 0.7' high at 12:51 PM.</p>
                </div>
            </div>
        </div>
        <div className='forecastInfoSecondColumnWrapper'>
            <div className='swellWindBlock'>
                <h2 className='swellWindTitle'>SWELL AND WIND</h2>
                <h2 className='swellTitle'>Primary Swell</h2>
                <h2 className='swellWindDetails'>Wave Height (FT.): 4.92 ft. at 9 seconds ENE @ 50°</h2>
                <h2 className='swellWindDetails'>Wave Height (M): 1.5 m. at 9 seconds ENE @ 50°</h2>
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