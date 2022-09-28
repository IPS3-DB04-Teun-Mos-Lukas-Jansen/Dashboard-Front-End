import React from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_USER_PREFRERENCES_URL + "/api/v1/url/";

export async function GetUrls(userId) {
  return await axios.get(API_URL + userId).then((res) => {
    return JSON.parse(res.data).urls;
  });
}

export async function AddUrl(userId, _url) {
  return await axios.post(API_URL + userId, null, {
    params: {
      url: _url,
    },
  });
}

export async function RemoveUrl(userId, _urlId) {
  return await axios.delete(API_URL + userId, {
    params: {
      urlid: _urlId,
    },
  });
}

export async function UpdateUrl(userId, _urlId, _newurl) {
  return await axios.put(API_URL + userId, null, {
    params: {
      newurl: _newurl,
      urlid: _urlId,
    },
  });
}
