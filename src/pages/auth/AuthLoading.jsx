import React from "react";
import { useEffect, useState, useContext } from "react";
import RequestTokens from "../../services/Google_Services/GoogleAuthServices";
import { useSearchParams} from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import {GetLoggedinUser } from "../../services/Google_Services/GoogleProfileService";
import { UserContext } from "../../app";

function AuthLoadingPage() {
    const navigate = useNavigate()

    const SetUser = useContext(UserContext).SetUser;

    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        handlelogin();
    });

    async function handlelogin() {
        const data = await RequestTokens(searchParams.get('code'));
        localStorage.setItem("tokens", JSON.stringify(data));

        SetUser(await GetLoggedinUser());


        navigate('/')
    }

    return (
        <div className="cover">
            <img src="https://c.tenor.com/DHkIdy0a-UkAAAAM/loading-cat.gif" alt="loading..."></img>
        </div>
    );
}

export default AuthLoadingPage