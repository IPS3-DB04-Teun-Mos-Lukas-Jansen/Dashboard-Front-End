import React, { useContext } from "react";
import { SideBarContext, UserContext } from "../../app";
import "./SideBar.css";
import { Link } from "react-router-dom";

import MenuBtnImg from "../../images/MenuBtnImg.svg";
import SettingsImg from "../../images/settings.svg";
import ThemeImg from "../../images/theme.svg";
import HomeImg from "../../images/home.svg";
import IntergrationsImg from "../../images/intergrations.svg";

export default function SideBar() {
  const SideBarShown = useContext(SideBarContext).SideBarShown;
  const SetSideBarShown = useContext(SideBarContext).SetSideBarShown;
  const User = useContext(UserContext).User;

  return (
    <div className="sidebar-container">
      {User && SideBarShown && (
        <div className="sidebar">

          <div className="sidebar-top">
            <span>Monkodash</span>
            <div className="spacer"></div>
            <div className="sidebar-close-btn">
              <div
                className="icon-btn sidebar-close-icon"
                onClick={() => {
                  SetSideBarShown(!SideBarShown);
                }}
              >
                <img src={MenuBtnImg}></img>
              </div>
            </div>

            

          </div>

          <div className="sidebar-page-list">
                
                <a href="/" className="icon-btn sidebar-page-btn"> 
                    <div className="sidebar-page-btn-icon">
                        <img src={HomeImg}></img>
                    </div>
                    <span>Home</span>
                </a>

                <a href="/Themes" className="icon-btn sidebar-page-btn"> 
                    <div className="sidebar-page-btn-icon">
                        <img src={ThemeImg}></img>
                    </div>
                    <span>Themes</span>
                </a>

                <a href="/Intergrations" className="icon-btn sidebar-page-btn"> 
                    <div className="sidebar-page-btn-icon">
                        <img src={IntergrationsImg}></img>
                    </div>
                    <span>Intergrations</span>
                </a>

                <a href="/Settings" className="icon-btn sidebar-page-btn"> 
                    <div className="sidebar-page-btn-icon">
                        <img src={SettingsImg}></img>
                    </div>
                    <span>Settings</span>
                </a>


            </div>
        </div>
      )}
    </div>
  );
}
