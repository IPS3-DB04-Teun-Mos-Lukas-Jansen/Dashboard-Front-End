import "./IntegrationsPage.css";
import { useEffect, useState } from "react";
import IntegrationInfo from "../../components/Integrations/IntegrationInfo/IntegrationInfo";
import addImg from "../../images/add.svg";
import AddIntegrationPopup from "../../components/Integrations/AddIntegrationPopup/AddIntegrationPopup";

export default function IntegrationsPage() {


  const [isOpen, setOpen] = useState(false);

  return(
  <div className="integrations-page-container">

    <div className="add-integration-btn-container">
        <div className="add-integration-btn" onClick={()=> setOpen(true)} ><img src={addImg} /></div>
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
          <IntegrationInfo></IntegrationInfo>
          <IntegrationInfo></IntegrationInfo>
          <IntegrationInfo></IntegrationInfo>
          <IntegrationInfo></IntegrationInfo>
          <IntegrationInfo></IntegrationInfo>
      </div>
    </div>
    <AddIntegrationPopup isOpen={isOpen} setOpen={setOpen} ></AddIntegrationPopup>
  </div>
  ) ;
}
