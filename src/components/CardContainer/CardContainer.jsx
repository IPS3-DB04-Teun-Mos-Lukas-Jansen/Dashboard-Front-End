import React, {useState, useEffect} from "react";
import "./CardContainer.css";
import UrlCard from "../Cards/UrlCard/UrlCard";

export default function CardContainer(props) {

    const card = props.card;
    
    function getCard() {
        if (card != null) {
            switch (card.cardType) {
                case "Url":
                    return UrlCard(card.cardId);
                case "kaas":
                    return UrlCard(card.cardId);
                case 'ggg':
                    return UrlCard(card.cardId);
            }
        }
    }

    return (
        <div className="card-container">
            {getCard()}
        </div>
    )
}