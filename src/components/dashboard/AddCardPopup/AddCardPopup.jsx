import React from "react";
import CardContainer from "../../CardContainer/CardContainer";
import "./AddCardPopup.css";

import {AddUrlCard} from "../../../services/UserPreferences_Services/UrlCardServices"
import {AddCardToLayout} from "../../../services/UserPreferences_Services/LayoutServices"

export default function AddCardPopup(props) {
    
  function ClosePopup() {
    props.ClosePopup();
  }

  async function AddUrlCardToLayout() {
    const cardId = await AddUrlCard();
    await AddCardToLayout(props.SelectedColumn,cardId, "Url");

    ClosePopup();
  }

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

          </div>
        </div>

        <div className="cancel-button-container">
          <button className="cancel-button" onClick={ClosePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
