import React, { useContext, useEffect } from "react";
import { UserContext } from "../../app";
import "./SideBar.css";
import { SideBarContext } from "./SideBarContextProvider";

import SettingsImg from "../../images/settings.svg";
import ThemeImg from "../../images/theme.svg";
import HomeImg from "../../images/home.svg";
import IntergrationsImg from "../../images/integrations.svg";

export default function SideBar() {
  const SideBarShown = useContext(SideBarContext).SideBarShown;
  const targetedwidth = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sidebar-width");
  const transduration = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sidebar-trans-duration");

  const User = useContext(UserContext).User;

  useEffect(() => {
    if (document.getElementById("sb") != null) {
      calculateBtnTransistionTime();

      if (SideBarShown) {
        show();
      } else {
        hide();
      }
    }
  }, [SideBarShown]);

  function show() {
    document.getElementById("sidebar-show-btn").style.transitionDelay = "0ms";
    document.getElementById("sidebar-show-btn").style.transitionTimingFunction =
      "linear";
    document.getElementById("sidebar-show-btn").style.translate =
      "calc( -10px - var(--header-height) )";

    document.getElementById("sb-container").style.width = targetedwidth;
    document.getElementById("sb").style.translate = 0;
  }

  function hide() {
    document.getElementById("sidebar-show-btn").style.transitionDelay = "0ms";
    document.getElementById("sidebar-show-btn").style.transitionDuration =
      transduration;
    document.getElementById("sidebar-show-btn").style.transitionTimingFunction =
      "ease-out";
    document.getElementById("sidebar-show-btn").style.translate = 0;

    document.getElementById("sb-container").style.width = 0;
    document.getElementById("sb").style.translate =
      "calc( 0px - var(--sidebar-width) )";
  }

  function calculateBtnTransistionTime() {
    const _targetedwidth = parseInt(targetedwidth);
    const _transduration = parseInt(transduration) / 1000;
    const secondsPerPixel = _transduration / _targetedwidth;
    const width = document.getElementById("sidebar-show-btn").offsetWidth;
    const btnTransdurationInMs = secondsPerPixel * 1000 * width;

    document.getElementById("sidebar-show-btn").style.transitionDuration =
      btnTransdurationInMs + "ms";
    return btnTransdurationInMs;
  }

  return (
    <div id="sb-container" className="sidebar-container">
      {User && (
        <div id="sb" className="sidebar">
          <div className="sidebar-top">
            <span>Monkodash</span>
            <div className="spacer"></div>
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
