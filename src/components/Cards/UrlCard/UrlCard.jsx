import React, { useEffect, useState, useContext } from "react";
import {
  GetUrlCard,
  RemoveUrlCard,
  AddUrlToCard,
  UpdateUrlInCard,
  RemoveUrlFromCard,
} from "../../../services/UserPreferences_Services/UrlCardServices";
import { RemoveCardFromLayout } from "../../../services/UserPreferences_Services/LayoutServices";
import "./UrlCard.css";
import { ApplicationContext, UserContext } from "../../../app";
import addImg from "../../../images/add.svg";
import deleteImg from "../../../images/delete.svg";
import editImg from "../../../images/edit.svg";
import moreImg from "../../../images/more.svg";
import { InitContext } from "../../dashboard/Dashboard";
import Popup from "reactjs-popup";

function UrlComponent(props) {
  const url = props.url.url;
  const urlId = props.url.urlId;
  const cardId = props.cardId;
  const urlImg =
    "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" +
    url +
    "&size=256";

  const ReloadCards = useContext(InitContext);

  const [EditUrltext, SetEditUrltext] = useState(url);
  const [editUrlOpen, setEditUrlOpen] = useState(false);

  const EditMode = useContext(ApplicationContext).EditMode;

  async function EditUrl(close) {
    if (EditUrltext != "") {
      await UpdateUrlInCard(cardId, urlId, EditUrltext);
      close();  
      ReloadCards();
    }
  }

  async function DeleteUrl(close) {
    await RemoveUrlFromCard(cardId, urlId);
    close();
    ReloadCards();
  }

  function startEdit() {
    console.log("start edit");
    SetEditUrltext(url);
  }

  return (
    <div className="single-url">
      {EditMode && (
        <div className="edit-url-button-container">
          <img onClick={()=> {startEdit(); setEditUrlOpen(true);}} className="edit-url-button" src={editImg}></img>
          <Popup
            open={editUrlOpen}
            modal
            nested
            onClose={() => setEditUrlOpen(false)}
          >
            {(close) => (
              
              <div className="popup-container edit-url-container">
                
                <h3 className="popup-h3">Edit URL</h3>
                <input
                  value={EditUrltext}
                  onChange={(e) => SetEditUrltext(e.target.value) }
                  type="text"
                  onKeyDown={(e) => { if (e.key == "Enter") {EditUrl(close)}}}
                ></input>
                <div className="delete-edit-popup-btns">
                  <button
                    onClick={() => {
                      EditUrl(close);
                    }}
                  >
                    Confirm
                  </button>
                  <Popup
                    position={"bottom center"}
                    trigger={<button className="delete-btn">Delete URL</button>}
                    modal
                  >
                    {(close2) => (
                      <div className="popup-container delete-popup">
                        Are you sure you want to delete this URL link?
                        <div className="delete-edit-popup-btns">
                          <button onClick={() => DeleteUrl(close)}>
                            Yes, I'm sure
                          </button>
                          <button onClick={() => close2()}>
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            )}
          </Popup>
        </div>
      )}
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
  const ReloadCards = useContext(InitContext);

  const [EditModeViewMore, SetViewMore] = useState(false);

  useEffect(() => {
    Init();
  }, [EditMode, ReloadCards]);

  async function Init() {
    if (isDummy != null && isDummy) {
      const urlList = [
        { urlId: "dummy", url: "https://www.youtube.com/" },
        { urlId: "dummy", url: "https://minecraft.net/" },
        { urlId: "dummy", url: "https://spotify.com/" },
      ];
      SetUrlList(urlList);
    } else {
      const card = await GetUrlCard(id);
      SetUrlList(card.urls);

      if (!EditMode & (card.urls.length < 1)) {
        SetEmpty(true);
      } else {
        SetEmpty(false);
      }
    }
  }

  async function AddUrl() {
    let url = AddUrltext;
    if (url != "") {
      if (!(url.startsWith("https://") | url.startsWith("http://")))
      {
        url = "https://" + url;
      }


      await AddUrlToCard(id, url);
      await ReloadCards();
      SetAddUrltext("");
    }
  }

  async function DeleteUrlCard() {
    await RemoveUrlCard(id);
    await RemoveCardFromLayout(column, id);
    await ReloadCards();
  }

  return (
    <div>
      {EditMode && (
        <div className="card-edit-container">
          <div className="card-edit-buttons">
            <div
              onClick={() => {
                SetViewMore(!EditModeViewMore);
              }}
              className={`switch ${
                !EditModeViewMore ? "more-btn" : "more-btn more-btn-active"
              }`}
            >
              <img src={moreImg}></img>
            </div>
            <div
              className={`switch ${
                EditModeViewMore ? "more-buttons" : "more-buttons hidden"
              }`}
            >
              <div onClick={DeleteUrlCard} className="card-delete-btn">
                <img src={deleteImg}></img>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="url-card">
        {UrlList.map((content, index) => {
          return <UrlComponent cardId={id} key={index} url={content} />;
        })}

        {EditMode && (
          <Popup
            trigger={
              <div className="single-url">
                <div className="add-url-card">
                  <img className="add-url-image-card" src={addImg}></img>
                </div>
              </div>
            }
            modal
          >
            {(close) => (
              <div className="popup-container">
                <h3 className="popup-h3">Add URL</h3>
                <input
                  
                  onKeyDown={(e) => { if (e.key == "Enter") {AddUrl(); close()}}}
                  onChange={(e) => SetAddUrltext(e.target.value)}
                  type="text"
                ></input>
                <button className="add-url-popup-btn"
                  onClick={() => {
                    AddUrl();
                    close();
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </Popup>
        )}
        {IsEmpty && (
          <div className="empty-container">
            <div className="single-url"></div>
            <h3>This URL List is empty {":("}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
