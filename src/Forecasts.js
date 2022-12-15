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
    props.setHome(true);
    props.setForecasts(false);
  }

  function showLogin() {
    props.setForecasts(false);
    props.setLogin(true);
  }

  function showSignUp() {
    props.setForecasts(false);
    props.setSignUp(true);
  }

  function logout() {
    props.setName(null);
  }

  function showFavorites() {
    if (props.name !== null) {
      props.setForecasts(false);
      props.setFavorites(true);
    }
    else {
      props.setForecasts(false);
      props.setLogin(true);
    }
  }

  function showForecastInfo(e) {
    props.setForecastInfo(true);
    props.setForecasts(false);
    props.setForecastLatitude(e.currentTarget.name);
    props.setForecastLongitude(e.currentTarget.title);
    props.setForecastLocation(e.currentTarget.alt);
  }

  function refresh() {
    window.location.reload(true);
  }

  return (
    <>
    <div className='page'>
      <div className='navbar'>
        <h1 onClick={showHome} className='navHome'>Hawai'i Surf</h1>
        <div className='navbarRight'>
          <h1 onClick={refresh} className='navbarItem'>Forecasts</h1>
          <h1 onClick={showFavorites} className='navbarItem'>Favorites</h1>
          {props.name === null ? <h1 onClick={showLogin} className='navbarItem'>Login</h1> : <h1 onClick={logout} className='navbarItem'>Logout</h1>}
          {props.name === null ? <h1 onClick={showSignUp} className='navbarItem'>Sign Up</h1> : <></>}
        </div>
      </div>
      <div className='forecastsMainTitleBlock'>
        <h1 className='forecastsMainTitle'>Forecasts</h1>
      </div>
      <div className='forecastsLocations'>
        <div className='forecastRow'>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Pipeline</h2>
                <img onClick={showForecastInfo} className='forecastIMG' src={img1} name={props.pipelineLat} title={props.pipelineLong} alt='Pipeline'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Jaws</h2>
                <img onClick={showForecastInfo} className='forecastIMG' src={img2} name={props.jawsLat} title={props.jawsLong} alt='Jaws'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Waikiki</h2>
                <img onClick={showForecastInfo} className='forecastIMG' src={img3} name={props.waikikiLat} title={props.waikikiLong} alt='Waikiki'/>
            </div>
        </div>
        <div className='forecastRow'>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Waimea Bay</h2>
                <img onClick={showForecastInfo} className='forecastIMG' src={img4} name={props.waimeaLat} title={props.waimeaLong} alt='Waimea'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Haleiwa</h2>
                <img onClick={showForecastInfo} className='forecastIMG' src={img5} name={props.haleiwaLat} title={props.haleiwaLong} alt='Haleiwa'/>
            </div>
            <div className='forecastItem'>
                <h2 className='forecastTitle'>Honolua Bay</h2>
                <img onClick={showForecastInfo} className='forecastIMG' src={img6} name={props.honoluaLat} title={props.honoluaLong} alt='Honolua'/>
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
