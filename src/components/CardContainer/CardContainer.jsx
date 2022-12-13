import React from "react";
import "./CardContainer.css";
import UrlCard from "../Cards/UrlCard/UrlCard";
import CurrentWeatherCard from "../Cards/CurrentWeatherCard/CurrentWeatherCard";
import BronFontysCard from "../Cards/BronFontysCard/BronFontysCard";

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
                case "openWeatherMap":
                    return CurrentWeatherCard(card.cardId, column);
                case "openWeatherMap-dummy":
                    return CurrentWeatherCard("dummy",0,true);
                case "bronFontys":
                    return BronFontysCard(card.cardId, column, card.params);
                case "bronFontys-dummy":
                    return BronFontysCard("dummy",0,{},true);
            }
        }
    }
    

    return (
        <div className="card-container">
            {getCard()}
        </div>
    )
}