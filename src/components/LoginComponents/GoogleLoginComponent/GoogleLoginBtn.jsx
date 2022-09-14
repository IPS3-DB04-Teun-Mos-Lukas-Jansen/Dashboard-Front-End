import React from "react";
import { useEffect, useState } from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";




function GoogleLoginBtn() {

  const [ profile, setProfile ] = useState([]);

  const [ refreshToken, setRefreshToken ] = useState([]);
  const [ accessToken, setAccessToken ] = useState([]);


  const clientId = "haha krijg je lekker niet";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    console.log(res);
    setProfile(res.profileObj);
  };

  const logOut = () => {
    setProfile(null);
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <div>
      {profile ? (
                <div>
                    <img src={profile.imageUrl} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
    </div>
  );
}

export default GoogleLoginBtn;
