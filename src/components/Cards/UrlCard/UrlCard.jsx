import React, { useEffect, useState, useContext } from "react";
import { GetUrlCard, RemoveUrlCard, AddUrlToCard } from "../../../services/UserPreferences_Services/UrlCardServices";
import { RemoveCardFromLayout } from "../../../services/UserPreferences_Services/LayoutServices";
import "./UrlCard.css";
import { ApplicationContext, UserContext } from "../../../app";
import addImg from "../../../images/add.svg";
import deleteImg from "../../../images/delete.svg";
import moreImg from "../../../images/more.svg";
import { InitContext } from "../../dashboard/Dashboard";
import Popup from "reactjs-popup";

function UrlComponent(props) {
  const url = props.url.Url;
  const urlId = props.url.UrlId;
  const urlImg =
    "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" +
    url +
    "&size=256";

  // useEffect(() => { }, []);

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


export default function UrlCard(id, column, isDummy) {
  const [UrlList, SetUrlList] = useState([]);

  const [IsEmpty, SetEmpty] = useState(false);

  const [AddUrltext, SetAddUrltext] = useState("");

  const EditMode = useContext(ApplicationContext).EditMode;
  const user = useContext(UserContext).User;
  const ReloadCards = useContext(InitContext);

  const [EditModeViewMore, SetViewMore] = useState(false);

  useEffect(() => {
    Init();
  }, [EditMode, ReloadCards]);

  async function Init() {

    if (isDummy != null && isDummy == true) {
      const urlList = [
        { UrlId: "dummy", Url: "https://www.youtube.com/" },
        { UrlId: "dummy", Url: "https://minecraft.net/" },
        { UrlId: "dummy", Url: "https://spotify.com/" },
      ];
      SetUrlList(urlList);
    }
    else {
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

  async function AddUrl() {
    const url = AddUrltext;
    if (url != "") {
      await AddUrlToCard(id,url);
      await ReloadCards();
    }
  }

  async function DeleteUrlCard() {
    await RemoveCardFromLayout(user.id, column, id);
    await RemoveUrlCard(id);
    await ReloadCards();
  }

  return (
    <div>
      {EditMode &&
        <div className="card-edit-container">
          <div className="card-edit-buttons">
            <div onClick={() => { SetViewMore(!EditModeViewMore) }} className={`switch ${!EditModeViewMore ? "more-btn" : "more-btn more-btn-active"}`} >
              <img src={moreImg}></img>
            </div>
            <div className={`switch ${EditModeViewMore ? "more-buttons" : "more-buttons hidden"}`}>
              <div onClick={DeleteUrlCard} className="card-delete-btn">
                <img src={deleteImg}></img>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="url-card">

        {UrlList.map((content, index) => {
          return <UrlComponent key={index} url={content} />;
        })}

        {EditMode &&

          <Popup trigger={
            <div className="single-url">
              <div className="add-url-card">
                <img className="add-url-image-card" src={addImg}></img>
              </div>
            </div>
          } modal>
          {close => (
            <div className="popup-container">
              <h3 >Add URL</h3>
              <input onSubmit={() => {AddUrl(); close(); }} onChange={(e) => SetAddUrltext(e.target.value)} type="text"></input>
              <button onClick={() => {AddUrl(); close(); }}>Add</button>
            </div>
          )} 
        </Popup>
}
        {IsEmpty &&
          <div>
            <h3>This url List is empty {":("}</h3>
          </div>
        }


      </div>
    </div>

  );
}
