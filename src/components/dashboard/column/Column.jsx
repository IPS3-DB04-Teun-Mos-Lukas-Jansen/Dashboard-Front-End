import React from "react";
import CardContainer from "../../CardContainer/CardContainer";
import "./Column.css";

function Column(index, cards) {
  return (
    <div className="column-container" key={index}>
      <h2>this is column {index}</h2>
    { cards &&
        <div>
            {cards.map((content, index) => {
                return <CardContainer card={content} key={index}></CardContainer>;
            })}
        </div>
    }
      
    </div>
  );
}

export default Column;
