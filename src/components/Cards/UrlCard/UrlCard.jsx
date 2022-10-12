import React, { useEffect, useState } from "react";
import { GetUrlCard } from "../../../services/UserPreferences_Services/UrlCardServices";
import "./UrlCard.css";

function UrlComponent(props) {
  const url = props.url.Url;
  const urlId = props.url.UrlId;
  const urlImg =
    "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" +
    url +
    "&size=256";

  useEffect(() => {}, []);

  return (
    <div className="single-url">
      <a className="url-link" href={url}>
        
        <div className="single-url-card">
          <img className="image-card" src={urlImg} alt={url}></img>
        </div>
      </a>
    </div>
  );
}

export default function UrlCard(id) {
  const [UrlList, SetUrlList] = useState([]);

  useEffect(() => {
    Init();
  }, []);

  async function Init() {
    const card = await GetUrlCard(id);
    console.log(card);
    SetUrlList(card.Urls);
  }

  return (
    <div className="url-card">
      {UrlList.map((content, index) => {
        return <UrlComponent key={index} url={content} />;
      })}
    </div>
  );
}
