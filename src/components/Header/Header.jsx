import React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext, ApplicationContext } from "../../app"
import { GoogleLoginButton } from "../LoginComponents/GoogleLoginComponent/GoogleLoginButton";
import "./Header.css"

export default function Header() {


    const User = useContext(UserContext).User;
    const Logout = useContext(UserContext).Logout;
    
    const SetEditMode = useContext(ApplicationContext).SetEditMode;
    const EditMode = useContext(ApplicationContext).EditMode;

    useEffect(() => {
        if (User != null) {

        };
    }, [User]);

    function toggleEditMode(){
        SetEditMode(!EditMode);
    }

    return (
        <div className="header">

            

            <div className="spacer"></div>

            {!User &&
                <div className="profile-info">
                    <GoogleLoginButton></GoogleLoginButton>
                </div>
            }

            {User &&
                <div className="profile-info">

                    <button onClick={toggleEditMode}>aaa</button>
                    <a onClick={Logout}>log out</a>
                    <img className="profile-picture" src={User.picture} alt="profile picture"></img>

                </div>
            }
        </div>
    )

}