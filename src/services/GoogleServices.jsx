import React from "react";
import axios from "axios";

    async function GetTokens(authcode) {
        
        await axios.post('https://oauth2.googleapis.com/token', null, {
            params: { 
                code: authcode, 
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                redirect_uri: process.env.REACT_APP_REDIRECT_URI+"/auth",
                grant_type: "authorization_code"
            }
        }).then(res => {
            console.log(res.data);

            return res.data;
            
        });
    };




export default GetTokens