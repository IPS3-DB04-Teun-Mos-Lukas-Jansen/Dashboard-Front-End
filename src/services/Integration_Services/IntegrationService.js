import axios from "axios";
import { GetTokenObject } from "../Google_Services/GoogleAuthServices";

// const API_URL = process.env.REACT_APP_INTEGRATIONS_URL_INSECURE + "/";
const API_URL =  "https://localhost:7252/";

export async function GetAllAvailableIntegrations() {
    return await axios.get(API_URL + "all").then((res) => {
        return res.data;
      });
}

export async function GetIntegrationCredentials() {
    const token = await GetTokenObject();
    return await axios.get(API_URL + "credentials/" + token.id_token).then((res) => {
        return res.data;
      });
}

export async function DeleteIntegrationCredentials(integration) {
    const token = await GetTokenObject();
    return await axios.delete(API_URL + "credentials/remove/" + token.id_token + "/" + integration).then((res) => {return res.data});
}