import React from "react";
import axios from "axios";
import { GetTokenObject } from "../Google_Services/GoogleAuthServices";

const API_URL =
  process.env.REACT_APP_USER_PREFRERENCES_URL + "/api/v1/urlcard/";

export async function GetUrlCard(cardId) {
  const token = await GetTokenObject();
  return await axios
    .get(API_URL + token.id_token, {
      params: {
        card_id: cardId,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function RemoveUrlCard(cardId) {
  const token = await GetTokenObject();
  return await axios.delete(API_URL + token.id_token, {
    params: { card_id: cardId },
  });
}

export async function AddUrlCard() {
  const token = await GetTokenObject();
  const cardId = await axios.post(API_URL + token.id_token).then((res) => {
    return res.data;
  });
  return cardId;
}

export async function AddUrlToCard(cardId, url) {
  const token = await GetTokenObject();
  return await axios
    .post(API_URL + token.id_token + "/url", null, {
      params: {
        url: url,
        card_id: cardId,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function UpdateUrlInCard(cardId, urlId, newUrl) {
  const token = await GetTokenObject();
  await axios.put(API_URL + token.id_token + "/url", null, {
    params: {
      url_id: urlId,
      new_url: newUrl,
      card_id: cardId,
    },
  });
}

export async function RemoveUrlFromCard(cardId, urlId) {
  const token = await GetTokenObject();
  await axios.delete(API_URL + token.id_token + "/url", {
    params: {
      url_id: urlId,
      card_id: cardId,
    },
  });
}
