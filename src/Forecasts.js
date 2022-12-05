import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeF.jpg';
import img2 from './static/jawsF.jpg';
import img3 from './static/waikikiF.jpg';

import img4 from './static/waimeaF.jpg';
import img5 from './static/haleiwaF.jpg';
import img6 from './static/honoluaF.jpg';

function Forecasts( {...props} ) {

  function showHome() {
    props.setHome(true)
    props.setForecasts(false)
  }

  function showForecasts() {
    console.log("FORECASTS")
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
      <div className='forecastsMainTitleBlock'>
        <h1 className='forecastsMainTitle'>Forecasts</h1>
      </div>
      <div className='forecastsLocations'>
        <div className='forecastRow'>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Pipeline</h2>
                <img className='forecastIMG' src={img1} alt='Pipeline'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Jaws</h2>
                <img className='forecastIMG' src={img2} alt='Jaws'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Waikiki</h2>
                <img className='forecastIMG' src={img3} alt='Waikiki'/>
            </div>
        </div>
        <div className='forecastRow'>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Waimea Bay</h2>
                <img className='forecastIMG' src={img4} alt='Pipeline'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Haleiwa</h2>
                <img className='forecastIMG' src={img5} alt='Jaws'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Honolua Bay</h2>
                <img className='forecastIMG' src={img6} alt='Waikiki'/>
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

export default Forecasts;
