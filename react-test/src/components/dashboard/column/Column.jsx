import React from "react";
import "./Column.css";

function Column(index) {
    return (
        <div className="column-container">
            <p>this is column {index +1}</p>
        </div>
    );
}

export default Column;
