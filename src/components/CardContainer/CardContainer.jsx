import React from "react";
import "./CardContainer.css";
import {RemoveUrl} from "../../services/UserPreferences_Services/UrlServices";
import deletebtn from "../../images/delete.svg";
import editbtn from "../../images/edit.svg";

export default function CardContainer(props) {


    async function DeleteUrl() {
        await RemoveUrl(props.user.id, props.object.UrlId);
        props.updateList();
    }


    return (
        <div className="card-container">
            { props.isEditMode &&
                <div >
                    <button className="mode-buttons edit-button">
                        <img className="mode-images" src={editbtn} alt="edit"></img>
                    </button>
                    <button onClick={DeleteUrl} className="mode-buttons delete-button">
                        <img className="mode-images" src={deletebtn} alt="delete"></img>
                    </button>
                    
                </div>
                
            }

            {props.children}
        </div>
    )
}