import React from "react";
import "../Card.css"

export default function UrlCard(props) {



    const urlImg = "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url="+ props.urlLink + "&size=256";

    return(
        <a href={props.urlLink} className="card url-card">
            <div className="url-card">
                <img className="image-card" src={urlImg}></img>
            </div> 
        </a>
    )
}