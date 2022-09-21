import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import jwt_decode from "jwt-decode"

const CLIENT_ID = "755577925419-0d8prudc123fjeps09i7s1589cd8hdti.apps.googleusercontent.com";
// const SCOPES = "https://www.googleapis.com/auth/userinfo.profile";

function Home() {

  const [ user, setUser ] = useState({});
  // const [ tokenClient, setTokenClient] = useState({});

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

    // // tokenClient
    // setTokenClient(google.accounts.oauth2.initTokenClient({
    //   client_id: CLIENT_ID,
    //   scopes: SCOPES,
    //   callback: (tokenResponse) => {
    //     console.log(tokenResponse);
    //   }
    //  })
    // );
    // // tokenClient.requestAccessToken();

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      
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
