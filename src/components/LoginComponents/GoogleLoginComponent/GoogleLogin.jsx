import React from "react";
import { useEffect, useState } from "react";

import jwt_decode from "jwt-decode"




function GoogleLogin() {
  const [tokenClient, setTokenClient] = useState({});

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    /* global google */
    const google = window.google;

    setTokenClient(google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      ux_mode: 'redirect',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI + "/auth",
      state: "YOUR_BINDING_VALUE"
    }));


    
  }, []);

  

  return (
    <div>
      <button onClick={() => {tokenClient.requestCode();}}>login</button>
    </div>
  );
}

export default GoogleLogin;
