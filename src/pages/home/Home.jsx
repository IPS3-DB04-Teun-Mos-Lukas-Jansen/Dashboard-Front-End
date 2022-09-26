import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import jwt_decode from "jwt-decode"
import GoogleLoginBtn from "../../components/LoginComponents/GoogleLoginComponent/GoogleLoginBtn";



function Home() {

  

  return (
    <div className="App">

      <GoogleLoginBtn></GoogleLoginBtn>

    </div>
  );
}

export default Home;
