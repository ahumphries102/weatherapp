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
  const [ city, setCity] = useState('Austin');
  const [ fiveDayWeather, setFiveDayWeather ] = useState([]);
  const kcFrac = 9/5;
  const kcSub = 459.67;

  function fetchWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=649c293108206310e295f6c2a84975dc`)
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
    .then(data=> { return setFiveDayWeather(data.list);
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

    const filteredDates = fiveDayWeather.filter(data=>{
        let timePattern = '00:00:00'
        return data.dt_txt.includes(timePattern)
    })
    const weatherCards = filteredDates.map((data, ind) => {
   
        return <div key={ind} className="weatherCards">Date {data.dt_txt}<br/> the weather today will be {data.weather[0].main}</div>

      })
  return (
    <div>
    <section className="mainContainer">
      <Landing city={weatherState.city} temperature={weatherState.zip} high={weatherState.high} low={weatherState.low} currentCondition={weatherState.currentCondition}/>

      <section className="formSection">
        <form onSubmit={handleSubmit}>
          <label>
          Enter City
          <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>

        <section className="weatherContainer">
          <h1>The Five Day Forecast</h1>
          <section className="weatherInfo">
          {weatherCards}
          </section>
        </section>
      </section>
    </div>
  );
}

export default App;