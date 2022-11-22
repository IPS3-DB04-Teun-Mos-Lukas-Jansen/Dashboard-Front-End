import { useEffect } from "react";
import Popup from "reactjs-popup";
import "./AddIntegrationPopup.css";
import { GetAllAvailableIntegrations } from "../../../services/Integration_Services/IntegrationService";

export default function AddIntegrationPopup(props) {

    useEffect(() => {
        init();	
    }, []);

    async function init() {
        console.log("init");
        const availableIntegrations =  await GetAllAvailableIntegrations();
        console.log(availableIntegrations);

    }

  return (
    <Popup open={props.isOpen} onClose={() => props.setOpen(false)} modal>
      <div className="add-integration-popup-container">
        <div className="add-integration-popup-header">
            <div>Add Integration</div>
            <input type="text" placeholder="Search &#x1F50D;"></input>
        </div>  
        <div className="add-integration-popup-content">
        <div className="add-integration-popup-item">
            <img src="https://www.minecraft.net/content/dam/games/minecraft/logos/MCVB_App_Icon_Flat_18x18.png"></img>
            Spotify
          </div>
          <div className="add-integration-popup-item">
            <img src="https://www.minecraft.net/content/dam/games/minecraft/logos/MCVB_App_Icon_Flat_18x18.png"></img>
            OpenWeatherMap
          </div>
        </div>
      </div>
    </Popup>
  );
}