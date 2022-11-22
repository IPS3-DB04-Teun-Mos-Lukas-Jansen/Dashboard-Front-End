import "./IntegrationInfo.css";
import Switch from "react-switch";
import { useState } from "react";
import Popup from "reactjs-popup";

import ConfigureImg from "../../../images/settings.svg";
import DeleteImg from "../../../images/delete.svg";
import MoreImg from "../../../images/more.svg";

export default function IntegrationInfo(props) {

  const [isEnabled, setIsEnabled] = useState(true);
  function ToggleIntegration(state) {
    setIsEnabled(state);
  }

  return (
    <div className="integration-info-container">
      <div className="integration-info-view-more-container">
        <Popup
          trigger={
            <div className="integration-info-view-more">
              <img src={MoreImg}></img>
            </div>
          }
            arrow={false}
            position="bottom center"
        >
            <div className="integration-info-view-more-popup">
                <div className="integration-info-view-more-popup-item"><img src={ConfigureImg}/>Configure</div>
                <div className="integration-info-view-more-popup-item integration-info-view-more-popup-item-delete"><div><div/></div>Remove</div>
            </div>
        </Popup>
      </div>

      <div className="integration-info">
        <div className="integration-info-img-container">
          <img src="https://www.minecraft.net/content/dam/minecraft/creeper.png"></img>
        </div>
        <div className="integration-info-content">
          <div className="integration-info-title">HALLO</div>
          <div className="integration-info-tag-container">
            <div className="integration-info-tag">dummy</div>
            <div className="integration-info-tag">dummy</div>
            <div className="integration-info-tag">dummy</div>
          </div>

          {true && (
            <div className="integration-info-noconfig-container">
              NO CONFIG!
            </div>
          )}
          <div className="spacer"></div>

          <div className="integration-info-bottom-container">
            <div className="integration-info-cardcount-container">
              Enables 4 cards
            </div>
            <div className="integration-info-bottom-right">
              <Switch
                onChange={ToggleIntegration}
                checked={isEnabled}
                uncheckedIcon={false}
                width={56 / 1.5}
                height={28 / 1.5}
                checkedIcon={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
