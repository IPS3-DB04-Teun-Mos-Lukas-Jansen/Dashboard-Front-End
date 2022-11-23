import axios from "axios";
import { GetTokenObject } from "../../Google_Services/GoogleAuthServices";

const API_URL = process.env.REACT_APP_INTEGRATIONS_URL_INSECURE + "/";

export async function SetOpenWeatherMapCredentials(isActive, cityName) {
    const token = await GetTokenObject();
    const config = {  "active": isActive,"city": cityName};
    return await axios.post(API_URL + token.id_token, config).then((res) => {
        return res.data;
      });
}

export async function GetCurrentWeatherForecast() {
    const token = await GetTokenObject();
    return await axios.get(API_URL + token.id_token).then((res) => {
        return res.data;
      });
}


