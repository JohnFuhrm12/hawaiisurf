import React, {useRef} from "react";

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

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
          <h1 className="loginHeaderText">Create Your Hawai'i Surf Account</h1>
        </div>
        <div class="loginContainer">
          <form className="loginForm" onSubmit={handleSubmit}>
            <input className="loginInput" type="text" ref={nameRef} placeholder='Username' required></input>
            <input className="loginInputPassword" type="text" ref={nameRef} placeholder='Password' required></input>
            <button className="loginButton" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      </>
    )
  }