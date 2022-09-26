import React from "react";
import { useEffect, useState } from "react";
import GetTokens from "../../services/GoogleServices";
import { useSearchParams } from "react-router-dom";

function AuthLoadingPage() {

    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        handlelogin();
    });

    async function handlelogin() {
        await GetTokens(searchParams.get('code'));
    }

    return (
        <div className="cover">
            <img src="https://c.tenor.com/DHkIdy0a-UkAAAAM/loading-cat.gif" alt="loading picture"></img>
        </div>
    );
}

export default AuthLoadingPage