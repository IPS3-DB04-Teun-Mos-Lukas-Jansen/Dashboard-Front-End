import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import jwt_decode from "jwt-decode"

const CLIENT_ID = "";
const CLIENT_SECRET = "";


function Home() {

  const [ user, setUser ] = useState({});
  const [ tokenClient, setTokenClient] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    google.accounts.id.prompt();
  }

  useEffect(() => {
    /* global google */
    const google = window.google;
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

    setTokenClient(google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      ux_mode: 'redirect',
      redirect_uri: "http://localhost:3000",
      state: "YOUR_BINDING_VALUE"
    }));
    
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">

      <button onClick={ (e) => tokenClient.requestCode()}>sign in</button>
      
      { user &&
      <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
      </div>
      }

    </div>
  );
}

export default Home;
