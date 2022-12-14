import React, { useEffect, useContext } from "react";
import RequestTokens from "../../services/Google_Services/GoogleAuthServices";
import { useSearchParams, useNavigate} from "react-router-dom";
import {GetLoggedinUser } from "../../services/Google_Services/GoogleProfileService";
import { UserContext } from "../../app";

function AuthLoadingPage() {
    const navigate = useNavigate()

    const SetUser = useContext(UserContext).SetUser;

    let [searchParams] = useSearchParams();
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
            <img className="auth-loading-image" src="https://c.tenor.com/DHkIdy0a-UkAAAAM/loading-cat.gif" alt="loading..."></img>
        </div>
    );
}

export default AuthLoadingPage