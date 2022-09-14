import React from "react";
import DashBoard from "../../components/dashboard/Dashboard.jsx";
import GoogleLoginBtn from "../../components/LoginComponents/GoogleLoginComponent/GoogleLoginBtn.jsx";
import "./Home.css";



function Home() {
  



  return (
    <div>
      <GoogleLoginBtn></GoogleLoginBtn>

      <DashBoard></DashBoard>
    </div>
  );
}

export default Home;
