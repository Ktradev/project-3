import React, {useEffect, useState} from 'react';

import axios from "axios";

import "./dist/styles.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json/?key=${process.env.REACT_APP_WEATHER_API}&q=da nang`)
    .then(data => {
      setWeather(data.data);
      console.log(data.data);
    })
    .catch(err => console.log(err));
  }, [axios])

  const weatherInput = (e) => {
    setInput(e.target.value);
  }

  const searchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json/?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`)
    .then(data => {
      setWeather(data.data);
    })
  } 

  return (
    <div className="App flex items-center justify-center">
      {weather && (
        <div>
          <div className="weather-info flex items-center justify-center text-center">
            <div className="condition">
              <img className="mx-auto" src={weather.current.condition.icon} alt="weather icon" />
              <h3 className="text-6xl py-4">{weather.current.temp_c}</h3>
              <h3 className="text-lg text-green-500 pb-10">{weather.current.condition.text}</h3>
            </div>
          </div>
          <div className="search flex">
            <input placeholder="Enter a city" onChange={weatherInput} className="px-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none border-b-2 border-green-500 w-8/12" type="text"/>
            <button onClick={searchWeather} className="w-4/12 bg-green-700 text-white active:bg-green-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">Search</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
