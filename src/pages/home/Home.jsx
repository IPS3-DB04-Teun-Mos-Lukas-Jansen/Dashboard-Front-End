import React, { Children } from "react";
import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { GetLayout, AddCardToLayout, RemoveCardFromLayout, RemoveColumnFromLayout} from "../../services/UserPreferences_Services/LayoutServices"
import { GetUrlCard, RemoveUrlCard, AddUrlCard, AddUrlToCard, UpdateUrlInCard, RemoveUrlFromCard } from "../../services/UserPreferences_Services/UrlCardServices"


import { UserContext } from "../../app"
import { useSearchParams} from "react-router-dom";


import CardContainer from "../../components/CardContainer/CardContainer";
import UrlCard from "../../components/Cards/UrlCard/UrlCard";
import DashBoard from "../../components/dashboard/Dashboard";

function Home() {

  const User = useContext(UserContext).User;

  const EditMode = useContext(UserContext).EditMode;

  const [Layout, SetLayout] = useState();

  const [UrlList, SetUrls] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {

    if (User != null) {
      init();
    }

  }, [User]);


  async function init() {
    SetLayout(await GetLayout(User.id));
  }




  return (
    <div className="App">
      {User &&
        <h1>

          {Layout &&
            <div>
              
            </div>
          }
          {User.name}
        </h1>
      }
      { !User &&
        <h1>NIET INGELOGD SUKKEL!!!</h1>
      }


      {/* <DashBoard></DashBoard> */}

    </div>
  );
}

export default Home;
