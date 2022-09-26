import React from "react";
import { useEffect, useState } from "react";
import RequestTokens from "../../services/GoogleServices";
import { useSearchParams} from "react-router-dom";
import { useNavigate  } from 'react-router-dom';

function AuthLoadingPage() {
    const navigate = useNavigate()

    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        handlelogin();
    });

    async function handlelogin() {
        const data = await RequestTokens(searchParams.get('code'));
        localStorage.setItem("tokens", JSON.stringify(data));
        
        navigate('/')
    }

    return (
        <div className="cover">
            <img src="https://c.tenor.com/DHkIdy0a-UkAAAAM/loading-cat.gif" alt="loading picture"></img>
        </div>
    );
}

export default AuthLoadingPage