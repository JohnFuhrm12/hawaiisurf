import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeF.jpg';

function ForecastInfo( {...props} ) {

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
      <div className='forecastInfoWrapper'>
        <div className='forecastTitleBlock'>
            <h1 className='forecastInfoTitle'>Current Conditions: Pipeline</h1>
            <img className='forecastInfoIMG' src={img1} alt='Pipeline'/>
        </div>
        <div className='mainForecastBlock'>
            <div className='surfHeightBubble'>
                <h2 className='surfHeight'>4-6 ft. - Good</h2>
            </div>
            <div className='forecastTextWrapper'>
            <p className='forecastText'>Good morning. A combo of medium-long period swell from the NW and medium-long period swell from the NNE are joining with more locally-generated wind swell from the E. End result is 4-6+ ft surf with a dominant wave period of 11 seconds. As of 10:10 AM wind is moderate and cross/sideshore from the ENE (70) at 6 mph. A 0.4' low tide at 7:26 AM rises to a 0.7' high at 12:51 PM.</p>
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