import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import jwt_decode from "jwt-decode"
import GoogleLogin from "../../components/LoginComponents/GoogleLoginComponent/GoogleLogin";
import {GetAccessToken} from "../../services/GoogleServices"



function Home() {
  useEffect(() => {
    GetAccessToken();
  });
  

  return (
    <div className="App">
      <GoogleLogin></GoogleLogin>

    </div>
  );
}

export default Home;
