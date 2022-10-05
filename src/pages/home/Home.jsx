import React, { Children } from "react";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { GetUrls, AddUrl, RemoveUrl, UpdateUrl } from "../../services/UserPreferences_Services/UrlServices"


import { UserContext } from "../../app"
import CardContainer from "../../components/CardContainer/CardContainer";
import UrlCard from "../../components/Cards/UrlCard/UrlCard";
import DashBoard from "../../components/dashboard/Dashboard";

function Home() {

  const User = useContext(UserContext).User;

  const [UrlList, SetUrls] = useState([]);

  const [EditMode, SetEditMode] = useState(false);

  const [InputText, SetInputText] = useState("");

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

  function InputChanged(event) {
    SetInputText(event.target.value);
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
          { EditMode &&
            <div>
              <input onChange={InputChanged} type="text"></input>
              <button onClick={() => {AddUrl(User.id,InputText); initUrls();}}>Add</button>
            </div>
          }
          
          
          <button onClick={ToggleEditMode}>EDIT</button>
        </div>
      }

      {/* <DashBoard></DashBoard> */}
    </div>
  );
}

export default Home;
