import React from "react";
import { useEffect, useState } from "react";




export function GoogleLogin() {
  const [tokenClient, setTokenClient] = useState({});

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    /* global google */
    const google = window.google;
    
    setTokenClient(google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      ux_mode: 'redirect',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI + "/auth",
      state: "YOUR_BINDING_VALUE"
    }));

    
  }, []);

  function requestcode() {
    tokenClient.requestCode();
  };
  
  return(
    <div>
      <button onClick={requestcode}>
        login
      </button>
    </div>
  )
  
};



