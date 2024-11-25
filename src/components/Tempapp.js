import React, { useEffect, useState } from "react";
import "./css/style.css";
// https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=cae1b1233c7eaf88391b174b8b63c6ed

export default function Tempapp() {
  const [weatherData, setWeatherData] = useState();
  const [search, setSearch] = useState("");
  const handler = (event) => {
    setSearch(event.target.value);
  };
  const handleclick = async () => {
    if (search == "") {
      alert("Enter name of the City");
    } else {
      try {
        const url = ` https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=cae1b1233c7eaf88391b174b8b63c6ed`;
        const response = await fetch(url);
        let data = await response.json();
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          weather: data.weather[0].main,
          code: data.cod,
        });
      } catch (error) {
        alert("Enter Correct name of city");
      }
    }
    setSearch("");
  };

  return (
    <div>
      <div className="weather-app">
        <div className="header">
          <h1>Weather App</h1>
          <p>Your go-to weather guide</p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a city..."
            value={search}
            onChange={handler}
          />
          <button onClick={handleclick}>Go</button>
        </div>
        {!weatherData ? (
          ""
        ) : (
          <div className="weather-card">
            <h2 className="city-name">{weatherData.location}</h2>
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="condition">{weatherData.weather} </p>
            <div className="additional-info">
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind speed: {weatherData.windSpeed}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
