import React, { useState, useContext } from "react";
import "./Dashboard.css";
import Column from "../dashboard/column/Column"
import { UserContext, ApplicationContext } from "../../app";
import { useEffect } from "react";
import { GetLayout } from "../../services/UserPreferences_Services/LayoutServices"
import AddCardPopup from "./AddCardPopup/AddCardPopup";

function GetColumnAmount(){
    return Math.min(Math.round((window.innerWidth -64 ) / 340),5) 
}


function GetColumnlist(props){

    const [Columns, setColumns] = useState(GetColumnAmount);

    function handleResize() 
    {
        setColumns(GetColumnAmount);
    }
    window.addEventListener('resize', handleResize)
    
    

    const _Columns = [];
    for (let index = 1; index < Columns + 1; index++) {
        const column = props.Layout.columns[index];
        var cards = null;

        const editMode = props.EditMode;
        const ShowAddCardPopup = props.ShowAddCardPopup;
        
        if (column != null) {
            cards = column.cards;
        }

        
        _Columns.push(Column(index, cards, editMode, ShowAddCardPopup));
    }
    return (_Columns);
}

function DashBoard() {

    const User = useContext(UserContext).User;
    const EditMode = useContext(ApplicationContext).EditMode;

    const [Layout, SetLayout] = useState();

    const [IsAddCardPopupShown, SetAddCardPopupShown] = useState(false);
    const [SelectedColumn, SetSelectedColumn] = useState(0);


    useEffect(() =>{
        if (User != null){
            init();
        }
    },[User])

    async function init() {
        SetLayout(await GetLayout(User.id));
    }

    async function ShowAddCardPopup(columnNumer) {
        SetSelectedColumn(columnNumer);
        SetAddCardPopupShown(true);
    }

    async function ClosePopup() {
        SetAddCardPopupShown(false);
        init();
    }

    return (
        <div className="dashboard-container">
            <div className="columns-container">
                { Layout &&
                    <GetColumnlist ShowAddCardPopup={ShowAddCardPopup} EditMode={EditMode} Layout={Layout}></GetColumnlist>
                }
            </div>

            { IsAddCardPopupShown &&
                <AddCardPopup ClosePopup={ClosePopup} SelectedColumn={SelectedColumn}></AddCardPopup>
            }
        </div>
    );


}

export default DashBoard;