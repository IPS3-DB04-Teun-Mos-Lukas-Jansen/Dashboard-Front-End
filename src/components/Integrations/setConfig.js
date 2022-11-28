
import {SetOpenWeatherMapCredentials} from "../../services/Integration_Services/Integrations/OpenWeatherMapService";

export default async function setConfig(integration, config) {
    if (integration.className == "openWeatherMap") {
        await SetOpenWeatherMapCredentials(config[0], config[1]);
    }
}