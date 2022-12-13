import React, {useRef} from "react";

// Reload window when logging in to fix 2x button press bug
export default function SignUp( {...props} ) {
    const nameRef = useRef();

    function showForecasts() {
      props.setLogin(false);
      props.setForecasts(true);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      window.location.reload(false);
    }

    function showHome() {
      props.setHome(true);
      props.setLogin(false);
    }
  
    return (
      <>
    <div className='page'>
      <div className='navbar'>
        <h1 onClick={showHome} className='navHome'>Hawai'i Surf</h1>
        <div className='navbarRight'>
          <h1 onClick={showForecasts} className='navbarItem'>Forecasts</h1>
          <h1 className='navbarItem'>Favorites</h1>
        </div>
      </div>
        <div className="loginHeader">
          <h1 className="loginHeaderText">Login to Hawai'i Surf</h1>
        </div>
        <div class="loginContainer">
          <form className="loginForm" onSubmit={handleSubmit}>
            <input className="loginInput" type="text" ref={nameRef} placeholder='Username' required></input>
            <button className="loginButton" type="submit">Login</button>
          </form>
        </div>
      </div>
      </>
    )
  }