import React, { useState } from "react";
import "./Dashboard.css";
import Column from "../dashboard/column/Column"


function GetColumnAmount(){
    return Math.round((window.innerWidth -64 ) / 340)
}


function GetColumnlist (){

    const [Columns, setColumns] = useState(GetColumnAmount);

    function handleResize() 
    {
        setColumns(GetColumnAmount);
    }
    window.addEventListener('resize', handleResize)


    const _Columns = [];
    for (let index = 0; index < Columns; index++) {
        
        _Columns.push(Column(index));
        
    }
    return (_Columns);
}


function DashBoard() {

    return (
        <div className="dashboard-container">
            <div className="columns-container">
                <GetColumnlist></GetColumnlist>
            </div>
        </div>
    );


}

export default DashBoard;