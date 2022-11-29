import axios from "axios";
import { GetTokenObject } from "../Google_Services/GoogleAuthServices";

const API_URL = process.env.REACT_APP_USER_PREFRERENCES_URL + "/api/v1/layout/";

export async function GetLayout() {
    const token = await GetTokenObject();
    return await axios.get(API_URL + token.id_token).then((res) => {
        return res.data;
      });
}

export async function AddCardToLayout(columnNumber, cardId, type) {
    const token = await GetTokenObject();
    return await axios.post(API_URL + "card/" + token.id_token, null, {
        params: {
            column_number : columnNumber,
            card_id : cardId,
            type : type
        },
    }).then((res) => { return res.data}); 
}

export async function RemoveCardFromLayout(columnNumber, cardId) {
    const token = await GetTokenObject();
    return await axios.delete(API_URL + "card/" + token.id_token, {
        params: {
            column_number: columnNumber,
            card_id : cardId
        },
      });
}

export async function RemoveColumnFromLayout(columnNumber) {
    const token = await GetTokenObject();
    return await axios.delete(API_URL + "column/" + token.id_token, {
        params: {
            column_number: columnNumber
        },
      });
}

export async function RemoveCardsOfType(type) {
    const token = await GetTokenObject();
    return await axios.delete(API_URL + "card/type/" + token.id_token, {
        params: {
            type: type
        },
      });
}