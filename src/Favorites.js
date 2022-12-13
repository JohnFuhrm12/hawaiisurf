import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeline.jpg';
import img2 from './static/jaws.jpg';
import img3 from './static/waikiki.jpg';

import swell from './static/swell.jpg';
import travel from './static/travel.jpg';
import surfboards from './static/surfboards.jpg';

function Favorites( {...props} ) {

  const [carouselTitle, setCarouselTitle] = useState("Pipeline")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [indexUpdate, setIndexUpdate] = useState(0)

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
    props.setHome(false);
    props.setForecasts(true);
  }

  function showLogin() {
    props.setHome(false);
    props.setLogin(true);
  }

  function refresh() {
    window.location.reload(true);
  }

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
      <div className='footer'>
        <h2 className='footerItem'>Hawai'i Surf</h2>
      </div>
    </div>
    </>
  );
}

export default Favorites;
