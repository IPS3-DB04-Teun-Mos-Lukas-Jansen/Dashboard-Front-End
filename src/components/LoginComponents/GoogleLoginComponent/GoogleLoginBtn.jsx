import React from "react";
import { useEffect, useState } from "react";


import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin  } from "@react-oauth/google";

function GoogleLoginBtn() {


  const [refreshToken, setRefreshToken] = useState([]);
  const [accessToken, setAccessToken] = useState([]);

  const onSuccess = (res) => {
    console.log(res);
    
  };

  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });


  return (
    <div>

      <div onClick={() => login()}>
        Sign in with Google 🚀{' '}
      </div>;

      <GoogleLogin
        onSuccess={onSuccess}
        
        onError={() => {
          console.log("Login Failed");
        }}

      />
      ;
    </div>
  );
}

export default GoogleLoginBtn;
