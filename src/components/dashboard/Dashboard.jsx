import React, { useState, useContext } from "react";
import "./Dashboard.css";
import Column from "../dashboard/column/Column"
import { UserContext, ApplicationContext } from "../../app";
import { useEffect } from "react";
import { GetLayout } from "../../services/UserPreferences_Services/LayoutServices"

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
        
        if (column != null) {
            cards = column.cards;
        }

        
        _Columns.push(Column(index, cards));
    }
    return (_Columns);
}



function DashBoard() {
    const User = useContext(UserContext).User;
    const [Layout, SetLayout] = useState();
    
    useEffect(() =>{
        if (User != null){
            init();
        }
    },[User])

    async function init() {
        SetLayout(await GetLayout(User.id));
    }

    return (
        <div className="dashboard-container">
            <div className="columns-container">
                { Layout &&
                    <GetColumnlist Layout={Layout}></GetColumnlist>
                }
            </div>
        </div>
    );


}

export default DashBoard;