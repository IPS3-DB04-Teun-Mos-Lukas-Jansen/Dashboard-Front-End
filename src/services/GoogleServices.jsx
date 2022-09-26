import React from "react";
import axios from "axios";


export default async function RequestTokens(authcode) {

    return await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
            code: authcode,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI + "/auth",
            grant_type: "authorization_code"
        }
    }).then(res => { return res.data; });
};

async function CheckAccesToken(accessToken) {
    return await axios.post('https://oauth2.googleapis.com/tokeninfo', null, {
        params: {
            access_token: accessToken
        }
    }).then(res => { return res.data; });
};

//Returns an Accesstoken or null
export async function GetAccessToken() {
    //Get tokens from local storage

    const tokenstring = localStorage.getItem("tokens");
    if (tokenstring == null) {
        return null
    };
    const tokens = JSON.parse(tokenstring);

    console.log(CheckAccesToken(tokens.access_token));
    //If access token is valid, return the acces token
    if (CheckAccesToken(tokens.access_token) == false){
        
         //Else check if refresh token is valid, if true get new access token, else null;

            console.log(CheckAccesToken(tokens.refresh_token));
    }
    else {
        return tokens.access_token;
    }
    

   



};

