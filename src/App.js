import React, { useState, useEffect } from 'react';
import Landing from './Components/Landing'
function App() {
  const [ weatherState, setWeatherState] = useState(
    {
      city:null,
      zip:null,
      high:null,
      low:null,
      currentCondition:null

    })
  const [ zip, setZip] = useState(78745);
  const [ fiveDayWeather, setFiveDayWeather ] = useState([]);
  const kcFrac = 9/5;
  const kcSub = 459.67;

  function fetchWeather() {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=649c293108206310e295f6c2a84975dc`)
      .then((response) => response.json())
      .then(weatherData => {
        return setWeatherState({
          city:weatherData.name,
          zip: Math.ceil(weatherData.main.temp * kcFrac - kcSub),
          high: Math.ceil(weatherData.main.temp_max * kcFrac - kcSub),
          low: Math.ceil(weatherData.main.temp_min * kcFrac - kcSub),
          currentCondition: weatherData.weather[0].description
        });
      })
  }

  function fetchForecast() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=4254010&appid=649c293108206310e295f6c2a84975dc')
    .then((response) => response.json())
    .then(data=> {
      return setFiveDayWeather(data.list);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var data = await Promise.all([
          fetchWeather(),
          fetchForecast()
        ]);
      } catch (error) {
        console.log(error);
      }
      return data;
    };
    fetchData();
  }, []);

    const handleSubmit = (evt) => {
     evt.preventDefault();
     fetchWeather()
    }

    const weatherCards = fiveDayWeather.map((data, ind) => {
   
        return <div key={ind} className="weatherCards">Date {data.dt_txt} the weather will be { data.weather[0].main}</div>

      })
  return (
    <div>
    <Landing city={weatherState.city} temperature={weatherState.zip} high={weatherState.high} low={weatherState.low} currentCondition={weatherState.currentCondition}/>




      <form onSubmit={handleSubmit}>
        <label>
        Enter Zip Code:
        <input
        type="text"
        value={zip}
        onChange={e => setZip(e.target.value)}
        />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <section className="weatherInfo">
      <h1>The Five Day Forecast</h1>
      {weatherCards}
      </section>
    </div>
  );
}

export default App;