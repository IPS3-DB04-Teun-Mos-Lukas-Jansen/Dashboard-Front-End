import "./IntegrationsPage.css";
import React, { useEffect, useState } from "react";
import IntegrationInfo from "../../components/Integrations/IntegrationInfo/IntegrationInfo";
import addImg from "../../images/add.svg";
import AddIntegrationPopup from "../../components/Integrations/AddIntegrationPopup/AddIntegrationPopup";
import {
  GetIntegrationCredentials,
  GetAllAvailableIntegrations,
} from "../../services/Integration_Services/IntegrationService";

export const integrationsContext = React.createContext();

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([]);
  const [allIntegrations, setAllIntegrations] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setIntegrations(await GetIntegrationCredentials());
    setAllIntegrations(await GetAllAvailableIntegrations());
  }

  const [isOpen, setOpen] = useState(false);

  return (
    <integrationsContext.Provider value={{ integrations, init }}>
      <div className="integrations-page-container">
        <div className="add-integration-btn-container">
          <div className="add-integration-btn" onClick={() => setOpen(true)}>
            <img src={addImg} />
          </div>
        </div>

        <div className="integrations-page">
          <div className="integrations-header">
            <h1>Active Integrations😎</h1>
            <div className="spacer"></div>
            <div className="integrations-search-container">
              <input type="text" placeholder="Search &#x1F50D;"></input>
            </div>
          </div>
          <div className="active-integrations-container">
            {integrations.map((integration, index) => (
              <IntegrationInfo
                key={index}
                allIntegrations={allIntegrations}
                integration={integration}
              />
            ))}
          </div>
        </div>
        <AddIntegrationPopup
          integrations={allIntegrations}
          isOpen={isOpen}
          setOpen={setOpen}
        ></AddIntegrationPopup>
      </div>
    </integrationsContext.Provider>
  );
}
