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
    }).then(res => { return res.status; }).catch(res => { return res.status; });
};

async function RequestAccesToken(refreshtoken) {

    return await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
            refresh_token: refreshtoken,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            grant_type: "refresh_token"
        }
    }).then(res => { return res.data; }).catch(error => { return null});
};


//Returns an Accesstoken or null
export async function GetAccessToken() {

    //Get tokens from local storage
    const tokenstring = localStorage.getItem("tokens");
    if (tokenstring == null) {
        return null
    };
    const tokens = JSON.parse(tokenstring);


    const checkedtoken = await CheckAccesToken(tokens.access_token);
    
    //If access token is valid, return the acces token
    if (checkedtoken != 200){
        
        //Else check if refresh token is valid, if true get new access token, else null;

        const newAccesToken = await RequestAccesToken(tokens.refresh_token);
        

        if (newAccesToken == null){
            return null;
        }

        tokens.access_token = newAccesToken.access_token;
        tokens.id_token = newAccesToken.id_token;

        localStorage.setItem("tokens", JSON.stringify(tokens));

        return newAccesToken.access_token;
    }
    else {
        return tokens.access_token;
    };
    
};

