import React, { Children } from "react";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { GetUrls, AddUrl, RemoveUrl, UpdateUrl } from "../../services/UserPreferences_Services/UrlServices"


import { UserContext } from "../../app"
import CardContainer from "../../components/CardContainer/CardContainer";
import UrlCard from "../../components/Cards/UrlCard/UrlCard";

function Home() {

  const User = useContext(UserContext).User;

  const [UrlList, SetUrls] = useState([]);

  const [EditMode, SetEditMode] = useState(false);

  useEffect(() => {

    if (User != null) {
      initUrls();
    }

  }, [User]);


  async function initUrls() {
    const urls = await GetUrls(User.id);
    SetUrls(urls);
  }

  function ToggleEditMode() {
    SetEditMode(!EditMode);
  }

  return (
    <div className="App">

      

      {User &&
        <div>
          <div className="cards">
            {UrlList.map((url, index) => {
              return (
                <CardContainer user = {User} object={url} updateList={initUrls} isEditMode={EditMode} key={index}>
                  <UrlCard urlLink={url.Url}></UrlCard>
                  
                </CardContainer>
              )
            })}
          </div>
        </div>
      }


      <button onClick={ToggleEditMode}>EDIT</button>
    </div>
  );
}

export default Home;
