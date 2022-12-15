import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeF.jpg';
import img2 from './static/jawsF.jpg';
import img3 from './static/waikikiF.jpg';

import img4 from './static/waimeaF.jpg';
import img5 from './static/haleiwaF.jpg';
import img6 from './static/honoluaF.jpg';

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

// Initialize Firebase Database
firebase.initializeApp({
    apiKey: "AIzaSyAzmdsZQLIhq6lZb1bGQRusNHWYEwF4Ny8",
    authDomain: "hawaiisurf-b817d.firebaseapp.com",
    projectId: "hawaiisurf-b817d",
    storageBucket: "hawaiisurf-b817d.appspot.com",
    messagingSenderId: "587941794922",
    appId: "1:587941794922:web:2bf14e8ea71b007df7e613"
})

// Firebase Database
const db = firebase.firestore();

function Forecasts( {...props} ) {

  const pipelineImg = "https://res.cloudinary.com/dvmw658s9/image/upload/v1670898269/HawaiiSurf/bh1vruk6mhnka0t8d1va.jpg";
  const jawsImg = "https://res.cloudinary.com/dvmw658s9/image/upload/v1670898269/HawaiiSurf/cczxepymzaqxg1mtjbie.jpg";
  const waikikiImg = "https://res.cloudinary.com/dvmw658s9/image/upload/v1670898269/HawaiiSurf/x56rqqilok6iiaevsu9b.jpg";
  const waimeaImg = "https://res.cloudinary.com/dvmw658s9/image/upload/v1670898269/HawaiiSurf/axqfen2451kosovaixe6.jpg";
  const haleiwaImg = "https://res.cloudinary.com/dvmw658s9/image/upload/v1670898269/HawaiiSurf/kqxwnwdljw66x7icgzi0.jpg";
  const honoluaImg = "https://res.cloudinary.com/dvmw658s9/image/upload/v1670898269/HawaiiSurf/zqazxj2t0wi9xvjqrzrv.jpg";

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

  const addToFavorites = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "favorites", props.name + e.currentTarget.getAttribute("data-name")), {
      user:  props.name,
      locationName: e.currentTarget.getAttribute("data-name"),
      locationLong: e.currentTarget.getAttribute("data-long"),
      locationLat: e.currentTarget.getAttribute("data-lat"),
      locationIMG: e.currentTarget.getAttribute("data-img"),
    });
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
                <div className='forecastTitleAddBlock'>
                  <h2 className='forecastTitle'>Pipeline</h2>
                  {props.name === null ? <></> : <h2 onClick={addToFavorites} className='addFavorites' data-img={pipelineImg} data-lat={props.pipelineLat} data-long={props.pipelineLong} data-name='Pipeline'>+</h2>}
                </div>
                <img onClick={showForecastInfo} className='forecastIMG' src={img1} name={props.pipelineLat} title={props.pipelineLong} alt='Pipeline'/>
            </div>
            <div className='forecastItem'>
            <div className='forecastTitleAddBlock'>
              <h2 className='forecastTitle'>Jaws</h2>
              {props.name === null ? <></> : <h2 onClick={addToFavorites} className='addFavorites' data-img={jawsImg} data-lat={props.jawsLat} data-long={props.jawsLong} data-name='Jaws'>+</h2>}
            </div>
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
