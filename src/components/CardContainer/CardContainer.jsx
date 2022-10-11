import React, {useState} from "react";
import "./CardContainer.css";

export default function CardContainer(props) {


    return (
        <div className="card-container">
            { props.isEditMode &&
                <div >
                    
                </div>
            }

            {props.children}

            
        </div>
    )
}