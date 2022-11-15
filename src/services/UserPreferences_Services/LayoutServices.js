import axios from "axios";


const API_URL = process.env.REACT_APP_USER_PREFRERENCES_URL + "/api/v1/layout/";

export async function GetLayout(userId) {
    return await axios.get(API_URL + userId).then((res) => {
        return res.data;
      });
}

export async function AddCardToLayout(userId, columnNumber, cardId, type) {
    return await axios.post(API_URL + "card/" + userId, null, {
        params: {
            column_number : columnNumber,
            card_id : cardId,
            type : type
        },
    }).then((res) => { return res.data}); 
}

export async function RemoveCardFromLayout(userId, columnNumber, cardId) {
    return await axios.delete(API_URL + "card/" + userId, {
        params: {
            column_number: columnNumber,
            card_id : cardId
        },
      });
}

export async function RemoveColumnFromLayout(userId, columnNumber) {
    return await axios.delete(API_URL + "column/" + userId, {
        params: {
            column_number: columnNumber
        },
      });
}