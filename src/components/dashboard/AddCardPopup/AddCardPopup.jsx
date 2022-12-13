import React, {useEffect, useState} from "react";
import CardContainer from "../../CardContainer/CardContainer";
import "./AddCardPopup.css";

import {AddUrlCard} from "../../../services/UserPreferences_Services/UrlCardServices"
import {AddCardToLayout} from "../../../services/UserPreferences_Services/LayoutServices"

export default function AddCardPopup(props) {
  const [inactiveCount, setInactiveCount] = useState(0);
    
  function ClosePopup() {
    props.ClosePopup();
  }

  async function AddUrlCardToLayout() {
    const cardId = await AddUrlCard();
    await AddCardToLayout(props.SelectedColumn,cardId, "Url");

    ClosePopup();
  }

  async function AddIntegrationCardToLayout(cardType) {
    const cardId = crypto.randomUUID();

    if (cardType === "bronFontys") {
      await AddCardToLayout(props.SelectedColumn,cardId, cardType, {articleCount: 3}); //inital article count is 3
    }
    else {
      await AddCardToLayout(props.SelectedColumn,cardId, cardType);
    }

    ClosePopup();
  }

  

  useEffect(() => {
    setInactiveCount(0);
    props.ActiveIntegrations.map((integration) => {
      console.log(integration);
      if (!integration.credentials.Active) {
        setInactiveCount(inactiveCount + 1);
      }
    });
  }, [props.ActiveIntegrations]);

  return (
    <div className="add-card-popup-container">
      <div className="add-card-popup">
        <div className="available-card-list-container">
          <div className="available-card-list">

            {/* URL Card */}
            <div className="card-list-item" onClick={AddUrlCardToLayout}>
              <div style={{ pointerEvents: "none" }}>
                <CardContainer card={{ cardType: "Url-dummy" }}></CardContainer>
              </div>

              <div>URL-Card</div>
            </div>
            {/* End of URL Card */}

            {/* Get all integrations */}
            {
              props.ActiveIntegrations.map((integration) => {
                console.log(integration);
                if (integration.credentials.Active) { 
                return (
                  <div className="card-list-item" key={integration.name} onClick={()=> {AddIntegrationCardToLayout(integration.name)}}>
                    <div style={{ pointerEvents: "none", width: "100%" }}>
                      <CardContainer card={{ cardType: (integration.name + "-dummy") }}></CardContainer>
                    </div>

                    <div>{integration.name}</div>
                  </div>
                  );
                }
              })
            }

          </div>
        </div>
        
        <div className="add-card-popup-footer">
          {
            inactiveCount > 0 && (
              <div className="inactive-integrations">
                <div className="inactive-integrations-text">
                  Not showing {inactiveCount} card{inactiveCount > 1 &&  "s" } because of {inactiveCount} inactive integration{inactiveCount > 1 &&  "s" } 
                </div>
              </div>
            )
          }
        <div className="cancel-button-container">
          <button className="cancel-button" onClick={ClosePopup}>
            Cancel
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
