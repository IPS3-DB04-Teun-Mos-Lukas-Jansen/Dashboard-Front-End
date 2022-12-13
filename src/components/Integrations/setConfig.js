import { SetBronFontysCredentials } from "../../services/Integration_Services/Integrations/BronFontysService";
import {SetOpenWeatherMapCredentials} from "../../services/Integration_Services/Integrations/OpenWeatherMapService";

export default async function setConfig(integration, config) {
    if (integration.className == "openWeatherMap") {
        await SetOpenWeatherMapCredentials(config[0], config[1]);
    }
    else if (integration.className == "bronFontys") {
        await SetBronFontysCredentials(config[0]);
    }
    else {
        console.log("Integration not found");
    }


}