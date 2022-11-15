import React from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_USER_PREFRERENCES_URL + "/api/v1/urlcard/";

export async function GetUrlCard(cardId) {
  return await axios.get(API_URL + cardId).then((res) => {
    return res.data;
  });
}

export async function RemoveUrlCard(cardId) {
  return await axios.delete(API_URL + cardId);
}

export async function AddUrlCard() {
  const cardId = await axios.post(API_URL).then((res) => {
    return res.data;
  });
  return cardId;
}

export async function AddUrlToCard(cardId, url) {
  return await axios.post(API_URL + cardId + "/url", null, {
      params: {
        url: url
      }}) .then((res) => {return res.data;});
}

export async function UpdateUrlInCard(cardId, urlId, newUrl) {
  await axios.put(API_URL + cardId + "/url", null, {
    params: {
      url_id: urlId,
      new_url: newUrl,
    },
  });
}

export async function RemoveUrlFromCard(cardId, urlId) {
  await axios.delete(API_URL + cardId + "/url", {
    params: {
      url_id: urlId,
    },
  });
}
