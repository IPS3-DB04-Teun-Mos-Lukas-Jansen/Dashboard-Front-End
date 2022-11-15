import React from "react";
import CardContainer from "../../CardContainer/CardContainer";
import "./Column.css";
import addBtnImg from "../../../images/add.svg"

function Column(index, cards, EditMode, ShowAddCardPopup) {

  return (
    <div className="column-container" key={index}>
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
