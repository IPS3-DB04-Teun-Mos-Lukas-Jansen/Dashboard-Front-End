import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./AddIntegrationPopup.css";
import IntegrationConfigurationPopup from "../IntegrationConfigurationPopup/IntegrationConfigurationPopup";

export default function AddIntegrationPopup(props) {

  const [currentConfig, setCurrentConfig] = useState();
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
  }, [props.isOpen]);

  function OpenConfig(integration) {
    setCurrentConfig(integration);
    setConfigOpen(true);
    props.setOpen(false);
  }

  return (
    <div>
      <IntegrationConfigurationPopup
        isOpen={configOpen}
        setOpen={setConfigOpen}
        integration={currentConfig}
      ></IntegrationConfigurationPopup>

      <Popup open={props.isOpen} onClose={() => props.setOpen(false)} modal>
        <div className="add-integration-popup-container">
          <div className="add-integration-popup-header">
            <div>Add Integration</div>
            <input type="text" placeholder="Search &#x1F50D;"></input>
          </div>
          <div className="add-integration-popup-content">
            {props.integrations.map((integration) => {
              return (
                <div
                  onClick={() => OpenConfig(integration)}
                  key={integration.className}
                  className="add-integration-popup-item"
                >
                  <img src={integration.imgUrl}></img>
                  {integration.name}
                </div>
              );
            })}
          </div>
        </div>
      </Popup>
    </div>
  );
}

