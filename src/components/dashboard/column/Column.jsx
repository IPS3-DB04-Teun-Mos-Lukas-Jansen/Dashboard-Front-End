import React from "react";
import CardContainer from "../../CardContainer/CardContainer";
import "./Column.css";
import {ApplicationContext} from "../../../app"

import { useEffect, useState, useContext } from "react";
import AddCardPopup from "../AddCardPopup/AddCardPopup";
import addBtnImg from "../../../images/add.svg"

function Column(index, cards, EditMode, ShowAddCardPopup) {

    console.log(EditMode);
    //

    //const EditMode = useContext(ApplicationContext).EditMode;

    // function AddCardToColumn() {
    //     SetPopup(true);
    // }

    // function ClosePopup() {
    //     SetPopup(false);
    //     // init();
    // }

  return (
    <div className="column-container" key={index}>
      {/* <h2>this is column {index}</h2> */}
      {cards && (
        <div>
          {cards.map((content, _index) => {
            return <CardContainer Column={index} card={content} key={_index}></CardContainer>;
          })}
        </div>
      )}

        { EditMode &&
            <button onClick={()=>ShowAddCardPopup(index)}  className="add-card-btn">
                <img alt="add card" src={addBtnImg}></img>
            </button>
        }

        
    </div>
  );
}

export default Column;
