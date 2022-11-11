import React, {useState} from "react";

export const SideBarContext = React.createContext(null);

export default function SideBarContextProvider(props) {

    const [SideBarShown, SetSideBarShown] = useState(false);
    
    return (
        <SideBarContext.Provider value={{SideBarShown,SetSideBarShown}}>
            {props.children}
        </SideBarContext.Provider>
    )
}