import React, { useEffect, useState, useContext } from "react";
import { GetUrlCard } from "../../../services/UserPreferences_Services/UrlCardServices";
import "./UrlCard.css";
import { ApplicationContext } from "../../../app";
import addImg from "../../../images/add.svg";

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

export default function UrlCard(id, isDummy) {
  const [UrlList, SetUrlList] = useState([]);

  const [IsEmpty, SetEmpty] = useState(false);

  const EditMode = useContext(ApplicationContext).EditMode;

  useEffect(() => {
    Init();
  }, [EditMode]);

  async function Init() {
    if (isDummy != null && isDummy == true) {
      const urlList = [
        { UrlId: "dummy", Url: "https://www.youtube.com/" },
        { UrlId: "dummy", Url: "https://minecraft.net/" },
        { UrlId: "dummy", Url: "https://spotify.com/" },
      ];
      SetUrlList(urlList);
    } else {
      const card = await GetUrlCard(id);
      SetUrlList(card.Urls);

      if (!EditMode & card.Urls.length < 1) {
        SetEmpty(true);
      }
      else {
        SetEmpty(false);
      }
    }
  }

  return (
    <div className="url-card">
      {UrlList.map((content, index) => {
        return <UrlComponent key={index} url={content} />;
      })}

      { EditMode && (
          <div className="single-url">
              <div className="add-url-card">
                <img className="add-url-image-card" src={addImg}></img>
              </div>
          </div>
      )}

      { IsEmpty && (
        <div>
          <h3>This url List is empty {":("}</h3>
        </div>
      )}
    </div>
  );
}
