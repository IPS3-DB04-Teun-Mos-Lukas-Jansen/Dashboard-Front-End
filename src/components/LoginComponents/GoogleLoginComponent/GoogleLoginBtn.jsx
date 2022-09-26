import React from "react";
import { useEffect, useState } from "react";

import jwt_decode from "jwt-decode"


function GoogleLoginBtn() {
  const [ user, setUser ] = useState({});
  const [ tokenClient, setTokenClient] = useState({});

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    /* global google */
    const google = window.google;

    setTokenClient(google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      ux_mode: 'redirect',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI+"/auth",
      state: "YOUR_BINDING_VALUE"
    }));


  }, []);

  return (
    <div>
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

export default GoogleLoginBtn;
