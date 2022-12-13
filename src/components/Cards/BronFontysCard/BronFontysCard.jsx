import "./BronFontysCard.css";
import { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import { ApplicationContext } from "../../../app";
import { InitContext } from "../../dashboard/Dashboard";
import moreImg from "../../../images/more.svg";
import {
  RemoveCardFromLayout,
  UpdateCardParams,
} from "../../../services/UserPreferences_Services/LayoutServices";
import { GetBronFontysData } from "../../../services/Integration_Services/Integrations/BronFontysService";

export default function BronFontysCard(id, column, cardData, isDummy = false) {
  const EditMode = useContext(ApplicationContext).EditMode;
  const ReloadCards = useContext(InitContext);
  var regex = /(<([^>]+)>)/gi; //Filter html

  const [articleCount, setArticleCount] = useState(cardData.articleCount);

  const [articles, setArticles] = useState([]);

  function openArticleInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  async function RemoveCard() {
    await RemoveCardFromLayout(column, id);
    await ReloadCards(true);
  }

  async function UpdateArticleCount() {
    await UpdateCardParams(column, id, { articleCount: articleCount });
    await ReloadCards();
  }

  useEffect(() => {
    if (!isDummy) {
      GetBronFontysData().then((data) => {
        setArticles(data);
        console.log(data);
      });
    } else {
      setArticles([
        {
          imgUrl: "https://content.presspage.com/uploads/1980/500_eenzaamdepressie.jpg?10000",
          pubDate: "2021-05-05T00:00:00",
          shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed tellus ultricies augue venenatis tempus. Aliquam sem dui, varius in eleifend semper, sodales non odio. Maecenas eu elit tempor, gravida lectus vitae, elementum turpis. Aliquam elementum eros et nunc aliquet, vitae mollis nunc dapibus. Sed tempus lorem massa, vehicula finibus lacus iaculis et. Donec non diam non nulla iaculis rutrum. Nullam sapien augue, vestibulum et commodo eu, tristique ac quam. Pellentesque ex ante, fermentum eu urna at, blandit fermentum metus. Fusce non libero imperdiet, vulputate dolor a, venenatis nulla. Vestibulum imperdiet dui ut nisl mattis semper. Mauris vel lacus quis.",
          title: "Lorem ipsum",
        },
      ]);
    }
  }, []);

  return (
    <div>
      {EditMode && (
        <div className="card-edit-container">
          <div className="card-edit-buttons">
            <Popup
              trigger={
                <div className="more-btn">
                  <img src={moreImg}></img>
                </div>
              }
              arrow={false}
              location="bottom center"
              nested
            >
              {(close) => (
                <div className="integration-info-view-more-popup">
                  <Popup
                    trigger={
                      <div className="integration-info-view-more-popup-item integration-info-view-more-popup-item-configure">
                        <div>
                          <div />
                        </div>
                        Config
                      </div>
                    }
                    arrow={false}
                    modal
                  >
                    {(close2) => (
                      <div className="integration-info-view-more-popup-modal">
                        <h1>Configure Card</h1>
                        <div className="integration-info-view-more-popup-modal-input">
                          <div>Maximum articles:</div>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={articleCount}
                            onChange={(e) => {
                              setArticleCount(e.target.value);
                            }}
                          />
                        </div>

                        <div className="integration-info-view-more-popup-modal-buttons">
                          <button
                            onClick={() => {
                              close2();
                              close();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              UpdateArticleCount();
                              close2();
                              close();
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>

                  <Popup
                    trigger={
                      <div className="integration-info-view-more-popup-item integration-info-view-more-popup-item-delete">
                        <div>
                          <div />
                        </div>
                        Remove
                      </div>
                    }
                    arrow={false}
                    modal
                  >
                    {(close2) => (
                      <div className="integration-info-view-more-popup-modal">
                        <h1>Are you sure you want to remove this card?</h1>
                        <div className="integration-info-view-more-popup-modal-buttons">
                          <button
                            onClick={async () => {
                              await RemoveCard();
                              close2();
                              close();
                            }}
                            className=""
                          >
                            Yes, delete this card.
                          </button>
                          <button
                            onClick={() => {
                              close2();
                              close();
                            }}
                            className=""
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )}
      <div className="bron-fontys-card">
        {articles.slice(0, cardData.articleCount).map((article, index) => {
          return (
            <div key={index} className="bron-fontys-article">
              <div
                onClick={() => openArticleInNewTab(article.link)}
                className="bron-fontys-article-image"
              >
                <img src={article.imgUrl}></img>
              </div>
              <div>
                <div
                  onClick={() => openArticleInNewTab(article.link)}
                  className="bron-fontys-article-title"
                >
                  {article.title}
                </div>
                <div className="bron-fontys-article-description">
                    { article.shortDescription != null && 
                        article.shortDescription.replace(regex, "")
                    }
                    {
                        article.shortDescription == null &&
                        article.description.replace(regex, "")
                    }
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
