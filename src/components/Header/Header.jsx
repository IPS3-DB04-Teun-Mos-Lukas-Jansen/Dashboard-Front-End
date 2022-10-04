import React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../app"
import { GoogleLogin } from "../../components/LoginComponents/GoogleLoginComponent/GoogleLogin";
import "./Header.css"

export default function Header() {


    const User = useContext(UserContext).User;
    const Logout = useContext(UserContext).Logout;

    useEffect(() => {
        if (User != null) {

        };
    }, [User]);


    return (
        <div className="header">

            
            <div className="spacer"></div>

            {!User &&
                <GoogleLogin></GoogleLogin>
            }

            {User &&
                <div className="profile-info">
                    <label>{User.name}</label>
                    <button onClick={Logout}>log out</button>
                    <img className="profile-picture" src={User.picture} alt="profile picture"></img>

                </div>
            }
        </div>
    )

}