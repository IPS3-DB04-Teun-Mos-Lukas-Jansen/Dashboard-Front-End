import React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../app"

export default function Header() {


    const User = useContext(UserContext).User;
    const Logout = useContext(UserContext).Logout;

    useEffect(() => {
        if (User != null) {
            
        };
    }, [User]);

    return (
        <div className="header">
            { User &&
                <div className="profile-info">
                    <label>{User.name}</label>
                    <img src={User.picture} alt="profile picture"></img>
                    <button onClick={Logout}>log out</button>

                </div>
            }
        </div>
    )

}