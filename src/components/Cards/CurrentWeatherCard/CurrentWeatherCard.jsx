import { useEffect, useState, useContext } from "react";
import { GetCurrentWeatherForecast } from "../../../services/Integration_Services/Integrations/OpenWeatherMapService";

import { ApplicationContext } from "../../../app";
import WindImg from "../../../images/navigation.svg";
import moreImg from "../../../images/more.svg";

import { InitContext } from "../../dashboard/Dashboard";
import "./CurrentWeatherCard.css";
import Popup from "reactjs-popup";
import { RemoveCardFromLayout } from "../../../services/UserPreferences_Services/LayoutServices";

export default function CurrentWeatherCard(id, column, isDummy) {
  const [WeatherData, SetWeatherData] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const EditMode = useContext(ApplicationContext).EditMode;
  const ReloadCards = useContext(InitContext);
  const [isEnabled, setIsEnabled] = useState(true);

  const [invalidText, setInvalidText] = useState("");

  function DegreesToWindDirection(windDirection) {
    if (windDirection > 337.5) return "North";
    if (windDirection > 292.5) return "North West";
    if (windDirection > 247.5) return "West";
    if (windDirection > 202.5) return "South West";
    if (windDirection > 157.5) return "South";
    if (windDirection > 122.5) return "South East";
    if (windDirection > 67.5) return "East";
    if (windDirection > 22.5) return "North East";
    return "North";
  }

  async function RemoveCard() {
    await RemoveCardFromLayout(column, id);
    await ReloadCards(true);
  }

  useEffect(() => {
    if (isDummy) {
      CreateDummyData();
    } else {
      UpdateWeatherData();
    }
  }, []);

  function CreateDummyData() {
    const data = {
      humidity: 50,
      imgName: "02d",
      imgUrl: "https://openweathermap.org/img/wn/02d@4x.png",
      tempInCelcius: 20,
      weatherDescription: "Cloudy",
      windDirection: 45,
      windSpeed: 1.5,
    };

    SetWeatherData(data);

    setWindDirection(DegreesToWindDirection(data.windDirection));
  }

  async function UpdateWeatherData() {
    try {
      const data = await GetCurrentWeatherForecast();
      console.log(data);
      SetWeatherData(data);
      setWindDirection(DegreesToWindDirection(data.windDirection));
      if (!isEnabled) {
        document.getElementById(id).style.filter = "none";
        setIsEnabled(true);
      }
    } catch (e) {
      switch (e.response.status) {
        case 406:
          console.log("406");
          CreateDummyData();
          document.getElementById(id).style.filter =
            "blur(2px) grayscale(100%) brightness(40%)";
            setInvalidText("OpenWeatherMap integration is disabled");
          setIsEnabled(false);
          break;
        case 404:
          console.log("404");
          CreateDummyData();
          document.getElementById(id).style.filter =
            "blur(2px) grayscale(100%) brightness(40%)";
            setInvalidText("City not found");
            setIsEnabled(false);
          break;
        case 400:
            console.log("400");
            CreateDummyData();
            document.getElementById(id).style.filter =
                "blur(2px) grayscale(100%) brightness(40%)";
                setInvalidText("No city set");
                setIsEnabled(false);
            break;
        default:
          console.log("default");
          break;
      }
    }

    await new Promise((r) => setTimeout(r, 1000 * 60));
    UpdateWeatherData();
  }

  useEffect(() => {
    InitBackground();
  }, [WeatherData]);

  function InitBackground() {
    if (WeatherData != null) {
      let imgurl = "";
      //images are temporary placeholders

      //dont look at this code, its ugly
      switch (WeatherData.imgName) {
        case "01d":
          // Clear sky
          imgurl =
            "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__340.jpg";
          break;
        case "01n":
          // Clear sky night
          imgurl =
            "https://media.istockphoto.com/id/826672506/photo/night-sky-with-stars.jpg?s=612x612&w=0&k=20&c=lPeDcgxVYmPQrWcuXQuT-bCsL28ZKWCMwO3A8IrmvRo=";
          break;
        case "02d":
          // Few clouds
          imgurl =
            "https://media.istockphoto.com/id/171225633/photo/deep-blue-view-on-a-lightly-clouded-day.jpg?s=612x612&w=0&k=20&c=KGV9ieDdP5wgx9unc_HwHmP5wuRmpgyDSA0h-3_gNNo=";
          break;
        case "02n":
          // Few clouds night
          imgurl =
            "https://media.istockphoto.com/id/1154430991/photo/dark-blue-storm-cloudy-sky-background.jpg?b=1&s=170667a&w=0&k=20&c=nyurCBs4SGGjny4MRhJdb4aQXc9MS1pj5VCw1XV4uKA=";
          break;
        case "03d":
          // Scattered clouds
          imgurl =
            "https://images.squarespace-cdn.com/content/v1/5d4c63022fdc0f0001a31f58/1565863502860-U636YZGVWKQJ47331LG6/cloud+dark+blue.jpg?format=2500w";
          break;
        case "03n":
          // Scattered clouds night
          imgurl =
            "https://media.istockphoto.com/id/1154430991/photo/dark-blue-storm-cloudy-sky-background.jpg?b=1&s=170667a&w=0&k=20&c=nyurCBs4SGGjny4MRhJdb4aQXc9MS1pj5VCw1XV4uKA=";
          break;
        case "04d":
          // Broken clouds
          imgurl =
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/625a747a-061b-477d-958f-a0d6cea9e4cb/dax9bd4-dd0da73d-5b6e-415c-b05e-19471f366e5a.jpg/v1/fill/w_1024,h_768,q_75,strp/broken_clouds_by_kevintheman_dax9bd4-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvNjI1YTc0N2EtMDYxYi00NzdkLTk1OGYtYTBkNmNlYTllNGNiXC9kYXg5YmQ0LWRkMGRhNzNkLTViNmUtNDE1Yy1iMDVlLTE5NDcxZjM2NmU1YS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.2HBtScMyydNDUe606gk2Jd8RHs6iM-76feSI7Dc3sLw";
          break;
        case "04n":
          // Broken clouds night
          imgurl =
            "https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/cloudy-1869753_1920.jpg?w=900";
          break;
        case "09d":
          // Shower rain
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "09n":
          // Shower rain night
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "10d":
          // Rain
          imgurl = "https://acegif.com/wp-content/uploads/rainy-10.gif";
          break;
        case "10n":
          // Rain night
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "11d":
          // Thunderstorm
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "11n":
          // Thunderstorm night
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "13d":
          // Snow
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "13n":
          // Snow night
          imgurl =
            "https://media.tenor.com/VRpD_dHvbt0AAAAM/duck-rainy-day.gif";
          break;
        case "50d":
          // Mist
          imgurl =
            "https://www.anwb.nl/binaries/content/gallery/anwb/nieuws/verkeer/redesign-standaard-beelden/weer-en-waarschuwing/mist-onderweg-verkeer-1520-x-855.jpg/mist-onderweg-verkeer-1520-x-855.jpg/anwb%3Aw760";
          break;
        case "50n":
          // Mist night
          imgurl =
            "https://www.anwb.nl/binaries/content/gallery/anwb/nieuws/verkeer/redesign-standaard-beelden/weer-en-waarschuwing/mist-onderweg-verkeer-1520-x-855.jpg/mist-onderweg-verkeer-1520-x-855.jpg/anwb%3Aw760";
          break;
        default:
          imgurl =
            "https://media.istockphoto.com/id/826672506/photo/night-sky-with-stars.jpg?s=612x612&w=0&k=20&c=lPeDcgxVYmPQrWcuXQuT-bCsL28ZKWCMwO3A8IrmvRo=";
          break;
      }
      document.getElementById(id).style.backgroundImage =
        "url('" + imgurl + "')";
      document.getElementById(id).style.backgroundSize = "cover";
      document.getElementById(id).style.backgroundPosition = "center";
      document.getElementById(id + "W").style.transform =
        "rotate( " + (WeatherData.windDirection + 180 ) + "deg)";
    }
  }

  return (
    <div>
      {!isEnabled && (
        <div className="disabled-container">
          <div className="disabled-overlay">
            {invalidText}
          </div>
        </div>
      )}
      {EditMode && (
        <div className="card-edit-container">
          <div className="card-edit-buttons">
            <Popup
              trigger={
                <div className="more-btn">
                  <img src={moreImg}></img>
                </div>
              }
              arrow={false}
              location="bottom center"
              nested
            >
              {(close) => (
                <Popup
                  trigger={
                    <div className="integration-info-view-more-popup">
                      <div
                        onClick={() => {}}
                        className="integration-info-view-more-popup-item integration-info-view-more-popup-item-delete"
                      >
                        <div>
                          <div />
                        </div>
                        Remove
                      </div>
                    </div>
                  }
                  arrow={false}
                  modal
                >
                  {(close2) => (
                    <div className="integration-info-view-more-popup-modal">
                      <h1>Are you sure you want to remove this card?</h1>
                      <div className="integration-info-view-more-popup-modal-buttons">
                        <button
                          onClick={async () => {
                            await RemoveCard();
                            close2();
                            close();
                          }}
                          className=""
                        >
                          Yes, delete this card.
                        </button>
                        <button
                          onClick={() => {
                            close2();
                            close();
                          }}
                          className=""
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              )}
            </Popup>
          </div>
        </div>
      )}

      <div id={id} className="current-weather-card">
        {WeatherData != null ? (
          <div className="current-weather-card-content">
            <div className="current-weather-card-image-container">
              <img
                className="current-weather-card-image"
                src={WeatherData.imgUrl}
                alt="Weather Icon"
              />
              <div className="current-weather-card-text-description">
                {WeatherData.weatherDescription}
              </div>
            </div>
            <div className="current-weather-card-text-container">
              <div className="current-weather-card-text">
                <div className="current-weather-card-text-degrees">
                  {Math.round(WeatherData.tempInCelcius * 10) / 10}°C
                </div>
                <div className="current-weather-card-text-location">
                  {WeatherData.location}
                </div>
              </div>
            </div>
            <div className="current-weather-card-wind-container">
              <div id={id + "W"} className="current-weather-card-wind">
                <img
                  className="current-weather-card-wind-image"
                  src={WindImg}
                  alt="Wind Icon"
                />
              </div>
              <div className="current-weather-card-wind-speed">
                {Math.round(WeatherData.windSpeed * 10) / 10} m/s
              </div>
              <div className="current-weather-card-wind-direction">
                {windDirection}
              </div>
            </div>
          </div>
        ) : (
          <div> Loading </div>
        )}
      </div>
    </div>
  );
}
