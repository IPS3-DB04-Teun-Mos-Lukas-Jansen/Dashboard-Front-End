import "./IntegrationInfo.css";
import Switch from "react-switch";
import { useState, useContext, useEffect } from "react";
import Popup from "reactjs-popup";

import ConfigureImg from "../../../images/settings.svg";
import MoreImg from "../../../images/more.svg";
import IntegrationConfigurationPopup from "../IntegrationConfigurationPopup/IntegrationConfigurationPopup";
import { integrationsContext } from "../../../pages/Integrations/IntegrationsPage";
import { DeleteIntegrationCredentials } from "../../../services/Integration_Services/IntegrationService";
import { RemoveCardsOfType } from "../../../services/UserPreferences_Services/LayoutServices";
import setConfig from "../setConfig";

export default function IntegrationInfo(props) {
  const [currentIntegrationInfo, setCurrentIntegrationInfo] = useState();
  const [isEnabled, setIsEnabled] = useState(
    props.integration.credentials.Active
  );
  const [configOpen, setConfigOpen] = useState(false);
  const reloadIntegrations = useContext(integrationsContext).init;
  const [validConfig, setValidConfig] = useState(true);

  async function ToggleIntegration(state) {
    const config = Object.values(props.integration.credentials).slice(1);
    await setConfig(currentIntegrationInfo, [state, ...config]);
    setIsEnabled(state);
    setIntegrationActiveColor(state);
    await reloadIntegrations();
  }

  function checkConfig() {
    if (props.integration.credentials != null) {
      const credentials = Object.values(props.integration.credentials).slice(1);
      for (let i = 0; i < credentials.length; i++) {
        if (credentials[i] === "" || credentials[i] === null) {
          setValidConfig(false);
          return;
        }
      }
    }
    setValidConfig(true);
  }

  function configureIntegration() {
    setConfigOpen(true);
  }

  function setIntegrationActiveColor(state) {
    document.getElementById(props.integration.name).style.transitionDuration =
      "0.5s";
    if (state) {
      document.getElementById(props.integration.name).style.filter =
        "saturate(100%) brightness(100%)";
    } else {
      document.getElementById(props.integration.name).style.filter =
        "saturate(0) brightness(90%)";
    }
  }

  async function deleteIntegration() {
    await DeleteIntegrationCredentials(props.integration.name);
    await RemoveCardsOfType(props.integration.name);
    await reloadIntegrations();
  }

  useEffect(() => {
    props.allIntegrations.map((integrationInfo) => {
      if (integrationInfo.className == props.integration.name) {
        setCurrentIntegrationInfo(integrationInfo);
        setIsEnabled(props.integration.credentials.Active);
        setIntegrationActiveColor(props.integration.credentials.Active);
      }
    });
  }, [props.allIntegrations]);

  useEffect(() => {
    checkConfig();
  }, [currentIntegrationInfo]);

  return (
    <div id={props.integration.name} className="integration-info-container">
      <IntegrationConfigurationPopup
        isOpen={configOpen}
        setOpen={setConfigOpen}
        integration={currentIntegrationInfo}
        defaultValues={props.integration.credentials}
      ></IntegrationConfigurationPopup>
      <div className="integration-info-view-more-container">
        <Popup
          trigger={
            <div className="integration-info-view-more">
              <img src={MoreImg}></img>
            </div>
          }
          arrow={false}
          position="bottom center"
          nested
        >
          <div className="integration-info-view-more-popup">
            <div
              onClick={configureIntegration}
              className="integration-info-view-more-popup-item"
            >
              <img src={ConfigureImg} />
              Configure
            </div>
            <Popup
              trigger={
                <div
                  className="integration-info-view-more-popup-item integration-info-view-more-popup-item-delete"
                >
                  <div>
                    <div />
                  </div>
                  Remove
                </div>
              }
              modal
            >
              {(close) => (
                <div className="integration-info-view-more-popup-delete">
                  <div>
                    <h2 className="integration-info-view-more-popup-delete-header" >Warning!</h2>
                    Are you sure you want to remove this integration? This will remove all cards associated with this integration.
                  </div>
                  <div className="integration-info-view-more-popup-delete-buttons">
                    <button onClick={deleteIntegration}>
                      Remove
                    </button>
                    <button onClick={close}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </Popup>
      </div>

      {currentIntegrationInfo && (
        <div className="integration-info">
          <div className="integration-info-img-container">
            <img src={currentIntegrationInfo.imgUrl}></img>
          </div>
          <div className="integration-info-content">
            <div className="integration-info-title">
              {currentIntegrationInfo.name}
            </div>
            <div className="integration-info-tag-container">
              {currentIntegrationInfo.tags.map((tag) => {
                return (
                  <div key={tag} className="integration-info-tag">
                    {tag}
                  </div>
                );
              })}
            </div>

            {!validConfig && props.integration.credentials.Active && (
              <div className="integration-info-noconfig-container">
                NO CONFIG!
              </div>
            )}

            {!props.integration.credentials.Active && (
              <div className="integration-info-inactive-container">
                Integration Disabled
              </div>
            )}

            <div className="spacer"></div>

            <div className="integration-info-bottom-container">
              <div className="integration-info-cardcount-container">
                Enables {currentIntegrationInfo.cardCount} card
                {currentIntegrationInfo.cardCount > 1 && "s"}
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
      )}
    </div>
  );
}
