import './App.css';
import { useEffect, useState } from 'react';

import img1 from './static/pipeline.jpg';
import img2 from './static/jaws.jpg';
import img3 from './static/waikiki.jpg';

import swell from './static/swell.jpg';
import travel from './static/travel.jpg';
import surfboards from './static/surfboards.jpg';

function HomeScreen( {...props} ) {
  const [currentSlide, setCurrentSlide] = useState(img1);

  function changeSlide(operator) {
    let slides = [img1, img2, img3];
    let currIndex = slides.indexOf(currentSlide);

    if (operator === 'dec') {
      slides[currIndex - 1] ? currIndex = currIndex - 1 : currIndex = 2;
    } else if (operator === 'inc') {
      slides[currIndex + 1] ? currIndex = currIndex + 1 : currIndex = 0;
    }
    
    setCurrentSlide(slides[currIndex]);
  }

  function showForecasts() {
    props.setHome(false);
    props.setForecasts(true);
  }

  function showLogin() {
    props.setHome(false);
    props.setLogin(true);
  }

  function showSignUp() {
    props.setHome(false);
    props.setSignUp(true);
  }

  function showFavorites() {
    if (props.name !== null) {
      props.setHome(false);
      props.setFavorites(true);
    }
    else {
      props.setHome(false);
      props.setLogin(true);
    }
  }

  function logout() {
    props.setName(null);
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
          <h1 onClick={showFavorites} className='navbarItem'>Favorites</h1>
          {props.name === null ? <h1 onClick={showLogin} className='navbarItem'>Login</h1> : <h1 onClick={logout} className='navbarItem'>Logout</h1>}
          {props.name === null ? <h1 onClick={showSignUp} className='navbarItem'>Sign Up</h1> : <></>}
        </div>
      </div>
      <div className="carousel" data-carousel>
          <button onClick={() => changeSlide('dec')} className="prev" data-carousel-button="prev">&#8249;</button>
          <button onClick={() => changeSlide('inc')} className="next" data-carousel-button="next">&#8250;</button>
          <img src={currentSlide} className="home-image" alt="Home"/>
          <h1 id='homeTitle'>FORECASTS | CONDITIONS | EQUIPMENT</h1>
      </div>
      <div className='homeCategories'>
        <div className='catObject'>
          <h2 className='catTitle'>SWELL</h2>
          <img onClick={showForecasts} src={swell} className='catImg' alt="Swell"/>
        </div>
        <div className='catObject'>
          <h2 className='catTitle'>TRAVEL</h2>
          <a href='https://www.surfline.com/travel/united-states/hawaii-surfing-and-beaches/5855797' target="blank"><img src={travel} className='catImg' alt="Travel"/></a>
        </div>
        <div className='catObject'>
          <h2 className='catTitle'>EQUIPMENT</h2>
          <a href='https://magicseaweed.com/feature/hardware/10183/' target="blank"><img src={surfboards} className='catImg' alt="Equipment"/></a>
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
