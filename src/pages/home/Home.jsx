import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import {GoogleLogin, GoogleLogout} from "../../components/LoginComponents/GoogleLoginComponent/GoogleLogin";
import {GetLoggedinUser} from "../../services/Google_Services/GoogleProfileService"
import {GetUrls, AddUrl, RemoveUrl, UpdateUrl} from "../../services/UserPreferences_Services/UrlServices"



function Home() {

  const [User, SetUser] = useState({});

  const [UrlList, SetUrls] = useState({});


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

    console.log(user);
    const urls = await GetUrls(user.id);
    console.log(urls);
    SetUrls(urls);
    
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
          <div>
            <button onClick={() => {AddUrl(User.id, "https://kanikeenkortebroekaan.nl😎")}}>add url</button>
            <button onClick={() => {RemoveUrl(User.id, "hmmm😎")}}>remove url</button>
            <button onClick={() => {UpdateUrl(User.id, "255d6455-3846-4ad3-a6de-705f7c7974c0", "bruh😎😎😎😎")}}>update url</button>
            
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
