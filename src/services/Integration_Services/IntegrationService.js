import axios from "axios";
import { GetTokenObject } from "../Google_Services/GoogleAuthServices";

const API_URL = process.env.REACT_APP_INTEGRATIONS_URL_INSECURE + "/";

export async function GetAllAvailableIntegrations() {
    return await axios.get(API_URL + "all").then((res) => {
        return res.data;
      });
}