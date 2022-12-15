import React, {useEffect, useRef, useState} from "react";

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
export default function Login( {onNameSubmit, ...props} ) {
    const nameRef = useRef();
    const credentialsRef = collection(db, "users");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameQueryResult, setUsernameQueryResult] = useState("");
    const [passwordQueryResult, setPasswordQueryResult] = useState("");

    const [credentials, setCredentials] = useState([]);

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
      getCredentials();
    }, [])

    const getCredentials = async () => {
      const usernameRef = query(credentialsRef);
      const currentQuerySnapshot = await getDocs(usernameRef);
      setCredentials(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    const getID = async () => {
      var usernames = '0000';
      var passwords = '0000';
      const usernameQuery = query(credentialsRef, where("userName", "==", username));

      const usernameQuerySnapshot = await getDocs(usernameQuery);
      usernameQuerySnapshot.forEach((doc) => {
        usernames = (doc.data().userName);
        passwords = (doc.data().password)
      });

      setUsernameQueryResult(usernames);
      setPasswordQueryResult(passwords);
    }

    function showForecasts() {
      props.setLogin(false);
      props.setForecasts(true);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      getID();
      if (username === usernameQueryResult && password === passwordQueryResult) {
        e.preventDefault();
        onNameSubmit(nameRef.current.value);
        window.location.reload(false);
      }
      else {
        setShowMessage(true);
      }
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
          {showMessage ? <h2 className="failMessage">Username or Password Incorrect</h2> : <></>}
          <h1 className="loginHeaderText">Login to Hawai'i Surf</h1>
        </div>
        <div class="loginContainer">
          <form className="loginForm" onSubmit={handleSubmit}>
            <input className="loginInput" type="text" ref={nameRef} placeholder='Username' onChange={(e) => {setUsername(e.target.value)}} value={username} required></input>
            <input className="loginInputPassword" type="text" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} value={password} required></input>
            <button className="loginButton" type="submit">Login</button>
          </form>
        </div>
      </div>
      </>
    )
  }