import React from "react";
import { useEffect, useState, useContext } from "react";
import "./Home.css";

import {
  GetLayout,
  AddCardToLayout,
  RemoveCardFromLayout,
  RemoveColumnFromLayout,
} from "../../services/UserPreferences_Services/LayoutServices";

import {
  GetUrlCard,
  RemoveUrlCard,
  AddUrlCard,
  AddUrlToCard,
  UpdateUrlInCard,
  RemoveUrlFromCard,
} from "../../services/UserPreferences_Services/UrlCardServices";


import { UserContext, ApplicationContext } from "../../app";
import { useSearchParams } from "react-router-dom";

import CardContainer from "../../components/CardContainer/CardContainer";
import UrlCard from "../../components/Cards/UrlCard/UrlCard";
import DashBoard from "../../components/dashboard/Dashboard";

function Home() {
  const User = useContext(UserContext).User;

  const EditMode = useContext(ApplicationContext).EditMode;

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
