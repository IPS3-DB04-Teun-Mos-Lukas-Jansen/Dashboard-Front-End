import React, {useState} from "react";
import "./CardContainer.css";
import {RemoveUrl, UpdateUrl} from "../../services/UserPreferences_Services/UrlServices";
import deletebtn from "../../images/delete.svg";
import editbtn from "../../images/edit.svg";

export default function CardContainer(props) {

    const [EditUrlMode, SetEditUrlMode] = useState(false);
    const [InputText, SetInputText] = useState("");

    async function DeleteUrl() {
        await RemoveUrl(props.user.id, props.object.UrlId);
        props.updateList();
    }

    async function EditUrl() {
        await UpdateUrl(props.user.id, props.object.UrlId, InputText);
        SetEditUrlMode(false);
        props.updateList();

    }

    function InputChanged(event) {
        SetInputText(event.target.value);
      }

    return (
        <div className="card-container">
            { props.isEditMode &&
                <div >
                    <button onClick={()=>{ SetEditUrlMode(!EditUrlMode);}} className="mode-buttons edit-button">
                        <img className="mode-images" src={editbtn} alt="edit"></img>
                    </button>
                    <button onClick={DeleteUrl} className="mode-buttons delete-button">
                        <img className="mode-images" src={deletebtn} alt="delete"></img>
                    </button>
                        <dialog open={EditUrlMode}>
                            <input onSubmit={EditUrl} onChange={InputChanged} type="text"></input>
                            <button onClick={EditUrl}>Confirm</button>
                            <button onClick={()=>{SetEditUrlMode(false);}}>Cancel</button>
                        </dialog>
                    
                </div>
                
            }

            {props.children}

            
        </div>
    )
}