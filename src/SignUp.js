import React, {useRef, useState} from "react";

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

// Reload window when logging in to fix 2x button press bug
export default function SignUp( {...props} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    function showForecasts() {
      props.setSignUp(false);
      props.setForecasts(true);
    }

    function showHome() {
      props.setHome(true);
      props.setSignUp(false);
    }

    const createUser = async (e) => {
        e.preventDefault();
        await setDoc(doc(db, "users", username), {
          userName:  username,
          password: password,
        });
        setUsername("");
        setPassword("");
        setShowMessage(true);
      };
  
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
            {showMessage ? <h2 className="successMessage">Account Successfully Created!</h2> : <></>}
          <h1 className="loginHeaderText">Create Your Hawai'i Surf Account</h1>
        </div>
        <div class="loginContainer">
          <form className="loginForm" onSubmit={createUser}>
            <input className="loginInput" type="text" placeholder='Username' onChange={(e) => {setUsername(e.target.value)}} value={username} required></input>
            <input className="loginInputPassword" type="text" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} value={password} required></input>
            <button className="loginButton" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      </>
    )
  }