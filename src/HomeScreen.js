import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeline.jpg';
import img2 from './static/jaws.jpg';
import img3 from './static/waikiki.jpg';

import swell from './static/swell.jpg';
import travel from './static/travel.jpg';
import surfboards from './static/surfboards.jpg';

function HomeScreen() {

  const [carouselTitle, setCarouselTitle] = useState("Pipeline")

  useEffect(() => {
    const buttons = document.querySelectorAll("[data-carousel-button]")

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]")
    
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        })
    });
  });

  function showForecasts() {
    console.log("FORECASTS")
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
            <button className="prev" data-carousel-button="prev">&#8249;</button>
            <button className="next" data-carousel-button="next">&#8250;</button>
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
