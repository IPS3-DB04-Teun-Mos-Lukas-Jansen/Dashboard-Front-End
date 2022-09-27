import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import {GoogleLogin, GoogleLogout} from "../../components/LoginComponents/GoogleLoginComponent/GoogleLogin";
import {GetLoggedinUser} from "../../services/GoogleProfileService"



function Home() {

  const [User, SetUser] = useState({});


  useEffect(() => {
    init();
  }, []);

  function Logout() {
    localStorage.removeItem("tokens");
    SetUser(null);
  }

  async function init() {
    const user = await GetLoggedinUser();
    SetUser(user);
  }
  

  return (
    <div className="App">

      { !User &&
        <GoogleLogin></GoogleLogin>
      }

      { User &&
        <div>
          <div>
            <button onClick={Logout}>Logout</button>
          </div>
          <img src={User.picture}></img>
          <div>{User.name} </div>
        </div>
      }
    </div>
  );
}

export default Home;
