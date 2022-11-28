import React, { useEffect, useState, useContext } from "react";
import Popup from "reactjs-popup";
import Switch from "react-switch";
import "../AddIntegrationPopup/AddIntegrationPopup.css";
import setConfig  from "../setConfig";
import { integrationsContext } from "../../../pages/Integrations/IntegrationsPage";

const configurationValueContext = React.createContext();

export default function IntegrationConfigurationPopup(props) {
  const [configuration, setConfiguration] = useState([]);
  const reloadIntegrations = useContext(integrationsContext).init;

  async function confirmConfig() {
    await setConfig(props.integration, configuration);
    await reloadIntegrations();
    props.setOpen(false);
  }

  useEffect(() => {
    if (props.defaultValues != undefined) {
      setConfiguration(Object.values(props.defaultValues));
    }
    else {
      setConfiguration([]);
    }
  }, [props.isOpen]);

  return (
    <configurationValueContext.Provider
      value={{ configuration, setConfiguration }}
    >
      <Popup
        open={props.isOpen}
        onClose={() => {
          props.setOpen(false);
        }}
        modal
      >
        {props.integration && (
          <div className="add-integration-popup-container">
            <div className="add-integration-popup-header">
              <div>Configure {props.integration.name}</div>
            </div>
            <div className="integration-info-description">{props.integration.description}</div>
            <div className="add-integration-popup-content">
              {props.integration.properties.map((property, index) => {
                return (
                  <div key={property.name} className="integration-config-entry">
                    <div className="integration-config-entry-name">
                      {property.name}
                    </div>
                    {props.defaultValues != undefined && 
                    <PropertyInput
                      property={property}
                      defaults={Object.values(props.defaultValues)}
                      index={index}
                    ></PropertyInput>
                    }
                    {props.defaultValues == undefined && 
                    <PropertyInput
                    property={property}
                    index={index}></PropertyInput>}
                  </div>
                );
              })}
            </div>
            <div className="spacer"></div>
            <div className="add-integration-popup-footer">
              <button onClick={confirmConfig} className="add-integration-popup-btn">
                Save integration
              </button>
            </div>
          </div>
        )}
      </Popup>
    </configurationValueContext.Provider>
  );
}

function PropertyInput(props) {
  const configuration = useContext(configurationValueContext).configuration;
  const setConfiguration = useContext(
    configurationValueContext
  ).setConfiguration;

  function SetProperty(value) {
    const index = props.index;
    setConfiguration(configuration => {
      return [
        ...configuration.slice(0, index),
         value,
        ...configuration.slice(index + 1),
      ]
    });
  }

  useEffect(() => {
    if (props.defaults != undefined) {
      SetProperty(props.defaults[props.index]);
    }
    else {
      if (props.property.type === "string") {
        SetProperty("");
      }
      else if (props.property.type === "boolean") {
        SetProperty(true);
      }
    }
  }, []);



  if (configuration[props.index] != undefined) {
    if (props.property.type === "string") {
      return <input onChange={(e)=> {SetProperty(e.target.value);}} value={configuration[props.index]} type="text" placeholder={props.property.name}></input>;
    } else if (props.property.type === "number") {
      return <input onChange={(e)=> {SetProperty(e.target.value);}} type="number"></input>;
    } else if (props.property.type === "boolean") {
      return (
        <Switch
          onChange={SetProperty}
          checked={configuration[props.index]}
          uncheckedIcon={false}
          width={56 / 1.5}
          height={28 / 1.5}
          checkedIcon={false}
        />
      );
    }
  }
}
