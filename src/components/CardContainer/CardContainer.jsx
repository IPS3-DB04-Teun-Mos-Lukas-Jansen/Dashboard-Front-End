import React, {useState, useEffect} from "react";
import "./CardContainer.css";
import UrlCard from "../Cards/UrlCard/UrlCard";

export default function CardContainer(props) {

    const card = props.card;
    const column = props.Column;
    
    function getCard() {
        if (card != null) {
            switch (card.cardType) {
                case "Url":
                    return UrlCard(card.cardId, column);
                case "Url-dummy":
                    return UrlCard("dummy",0,true);
            }
        }
    }

    return (
        <div className="card-container">
            {getCard()}
        </div>
    )
}