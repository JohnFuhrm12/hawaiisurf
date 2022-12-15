import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeline.jpg';
import img2 from './static/jaws.jpg';
import img3 from './static/waikiki.jpg';

import swell from './static/swell.jpg';
import travel from './static/travel.jpg';
import surfboards from './static/surfboards.jpg';

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

function Favorites( {...props} ) {

  const [carouselTitle, setCarouselTitle] = useState("Pipeline")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [indexUpdate, setIndexUpdate] = useState(0)

  const [favoritesItems, setFavoritesItems] = useState([]);

  const favoritesRef = collection(db, "favorites");

  useEffect(() => {
    getFavoritesItems();
  }, [])

  const getFavoritesItems = async () => {
    const favRef = query(favoritesRef, where('user', '==', props.name));
    const currentQuerySnapshot = await getDocs(favRef);
    setFavoritesItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  function updateIndex() {
    if (indexUpdate === 0) {
      setIndexUpdate(1)
    }
    if (indexUpdate === 1) {
      setIndexUpdate(0)
    }
  }

  useEffect(() => {
    const buttons = document.querySelectorAll("[data-carousel-button]")

    if (currentIndex === 0) {
      setCarouselTitle("Pipeline")
    }
    if (currentIndex === 1) {
      setCarouselTitle("Jaws")
    }
    if (currentIndex === 2) {
      setCarouselTitle("Waikiki")
    }

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]")
    
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        setCurrentIndex(newIndex)

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        })
    });
  }, [indexUpdate]);

  function showForecasts() {
    props.setFavorites(false);
    props.setForecasts(true);
  }

  function showLogin() {
    props.setFavorites(false);
    props.setLogin(true);
  }

  function refresh() {
    window.location.reload(true);
  }

  function showForecastInfo(e) {
    props.setForecastInfo(true);
    props.setFavorites(false);
    props.setForecastLatitude(e.currentTarget.name);
    props.setForecastLongitude(e.currentTarget.title);
    props.setForecastLocation(e.currentTarget.alt);
  }

  const remove = async (e) => {
    deleteDoc(doc(db, 'favorites', props.name + e.currentTarget.getAttribute("data-name")));
  };

  return (
    <>
    <div className='page'>
      <div className='navbar'>
        <h1 onClick={refresh} className='navHome'>Hawai'i Surf</h1>
        <div className='navbarRight'>
          <h1 onClick={showForecasts} className='navbarItem'>Forecasts</h1>
          <h1 className='navbarItem'>Favorites</h1>
          <h1 onClick={showLogin} className='navbarItem'>Login</h1>
        </div>
      </div>
      <h1 className='favoritesTitle'>{props.name}'s Favorites</h1>
      <div className='favoritesColumn'>
        {favoritesItems.map((favorite) => {
          return (
            <>
            <div className='forecastRow'>
            <div className='forecastItem'>
            <div className='forecastTitleAddBlock'>
              <h2 className='forecastTitle'>{favorite.locationName}</h2>
              <h2 onClick={remove} className='subtFavorites' data-name={favorite.locationName}>-</h2>
            </div>
                <img onClick={showForecastInfo} className='forecastIMG' src={favorite.locationIMG} name={favorite.locationLat} title={favorite.locationLong} alt={favorite.locationName}/>
            </div>
            </div>
            </>
          )
        })}
      </div>
      <div className='footer'>
        <h2 className='footerItem'>Hawai'i Surf</h2>
      </div>
    </div>
    </>
  );
}

export default Favorites;
