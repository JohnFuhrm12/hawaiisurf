import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeline.jpg';
import img2 from './static/jaws.jpg';
import img3 from './static/waikiki.jpg';

import swell from './static/swell.jpg';
import travel from './static/travel.jpg';
import surfboards from './static/surfboards.jpg';

function HomeScreen( {...props} ) {

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
    props.setHome(false)
    props.setForecasts(true)
  }

  return (
    <>
    <div className='page'>
      <div className='navbar'>
        <h1 className='navHome'>Hawai'i Surf</h1>
        <div className='navbarRight'>
          <h1 onClick={showForecasts} className='navbarItem'>Forecasts</h1>
          <h1 className='navbarItem'>Favorites</h1>
          <h1 className='navbarItem'>Login</h1>
          <h1 className='navbarItem'>Sign Up</h1>
        </div>
      </div>
      <div className='carouselBlock'>
        <div className="carousel" data-carousel>
            <button onClick={updateIndex} className="prev" data-carousel-button="prev">&#8249;</button>
            <button onClick={updateIndex} className="next" data-carousel-button="next">&#8250;</button>
            <ul data-slides>
                <li className="slide" data-active><img src={img1} className="home-image" alt="Pipeline"/></li>
                <li className="slide"><img src={img2} className="home-image" alt="Jaws"/></li>
                <li className="slide"><img src={img3} className="home-image" alt="Waikiki"/></li>
            </ul>
          <div class="imgTitle">{carouselTitle}</div>
        </div>
      </div>
      <div className='homeCategories'>
        <div className='catObject'>
          <h2 className='catTitle'>SWELL</h2>
          <img src={swell} className='catImg' alt="Swell"/>
        </div>
        <div className='catObject'>
          <h2 className='catTitle'>TRAVEL</h2>
          <img src={travel} className='catImg' alt="Travel"/>
        </div>
        <div className='catObject'>
          <h2 className='catTitle'>EQUIPMENT</h2>
          <img src={surfboards} className='catImg' alt="Swell"/>
        </div>
      </div>
      <div className='footer'>
        <h2 className='footerItem'>Hawai'i Surf</h2>
      </div>
    </div>
    </>
  );
}

export default HomeScreen;
