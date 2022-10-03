import React from "react";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { GetUrls, AddUrl, RemoveUrl, UpdateUrl } from "../../services/UserPreferences_Services/UrlServices"
import { GoogleLogin, GoogleLogout } from "../../components/LoginComponents/GoogleLoginComponent/GoogleLogin";

import { UserContext } from "../../app"

function Home() {

  const User = useContext(UserContext).User;

  const [UrlList, SetUrls] = useState([]);

  useEffect(() => {

    if (User != null) {
      initUrls();
    }

  }, [User]);


  async function initUrls() {
    const urls = await GetUrls(User.id);
    SetUrls(urls);
  }

  return (
    <div className="App">

      {!User &&
        <GoogleLogin></GoogleLogin>
      }

      {User &&
        <div>
          <div>
            {/* <button onClick={Logout}>Logout</button> */}
          </div>
          <img src={User.picture}></img>
          <div>{User.name} </div>
          <div>
            <button onClick={() => { AddUrl(User.id, "https://kanikeenkortebroekaan.nl😎"); initUrls(User); }}>add url</button>
            <button onClick={() => { RemoveUrl(User.id, "hmmm😎") }}>remove url</button>
            <button onClick={() => { UpdateUrl(User.id, "255d6455-3846-4ad3-a6de-705f7c7974c0", "bruh😎😎😎😎") }}>update url</button>
          </div>
          <div>
            {UrlList.map((url, index) => {
              return (
                <div key={index}>
                  <a href={url.Url}>{url.Url}</a>
                </div>
              )
            })}
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
