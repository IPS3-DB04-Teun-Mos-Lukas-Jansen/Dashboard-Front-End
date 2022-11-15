import React, { useContext } from "react";
import "./Home.css";


import { UserContext } from "../../app";
import DashBoard from "../../components/dashboard/Dashboard";

function Home() {
  const User = useContext(UserContext).User;


  return (
    <div className="App">
      {User && (
        <div>
          <DashBoard></DashBoard>
        </div>
      )}
      {!User && <h1>NIET INGELOGD SUKKEL!!!</h1>}
    </div>
  );
}

export default Home;
