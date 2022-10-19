import React from "react";
import axios from "axios";
import { GetAccessToken } from "./GoogleAuthServices";

export async function GetProfile(AccessToken) {

    return await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        params: {
            alt: "json",
            access_token: AccessToken
        }
    }).then(res => { return res.data; });
    
}

export async function GetLoggedinUser() {
    const accesstoken = await GetAccessToken();
    if (accesstoken != null)
    {
        const profile = await GetProfile(accesstoken);
        return profile;
    }
    return null;
    
}
