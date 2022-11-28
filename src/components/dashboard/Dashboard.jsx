import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css";
import Column from "../dashboard/column/Column";
import { UserContext, ApplicationContext } from "../../app";
import { GetLayout } from "../../services/UserPreferences_Services/LayoutServices";
import AddCardPopup from "./AddCardPopup/AddCardPopup";
import { GetIntegrationCredentials } from "../../services/Integration_Services/IntegrationService";

function GetColumnAmount() {
  return Math.min(Math.round((window.innerWidth - 64) / 340), 5);
}

function GetColumnlist(props) {
  const [Columns, setColumns] = useState(GetColumnAmount);

  function handleResize() {
    setColumns(GetColumnAmount);
  }
  window.addEventListener("resize", handleResize);

  const _Columns = [];
  for (let index = 1; index < Columns + 1; index++) {
    let column = null;

    if (props.Layout != null) {
      column = props.Layout.columns[index];
    }

    let cards = null;

    const editMode = props.EditMode;
    const ShowAddCardPopup = props.ShowAddCardPopup;

    if (column != null) {
      cards = column.cards;
    }

    _Columns.push(Column(index, cards, editMode, ShowAddCardPopup));
  }
  return _Columns;
}

export const InitContext = React.createContext(null);

function DashBoard() {
  const User = useContext(UserContext).User;
  const EditMode = useContext(ApplicationContext).EditMode;

  const [Layout, SetLayout] = useState();

  const [IsAddCardPopupShown, SetAddCardPopupShown] = useState(false);
  const [SelectedColumn, SetSelectedColumn] = useState(0);

  const [ActiveIntegrations, SetActiveIntegrations] = useState([]);

  useEffect(() => {
    if (User != null) {
      init();
    }
  }, [User]);

  async function init() {
    SetLayout(await GetLayout());
    SetActiveIntegrations( await GetIntegrationCredentials());
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
      <InitContext.Provider value={init}>
        <div className="columns-container">
          <GetColumnlist
            ShowAddCardPopup={ShowAddCardPopup}
            EditMode={EditMode}
            Layout={Layout}
          ></GetColumnlist>
        </div>

        {IsAddCardPopupShown && (
          <AddCardPopup
            ClosePopup={ClosePopup}
            SelectedColumn={SelectedColumn}
            ActiveIntegrations={ActiveIntegrations}
          ></AddCardPopup>
        )}
      </InitContext.Provider>
    </div>
  );
}

export default DashBoard;
