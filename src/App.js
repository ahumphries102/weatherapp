import React, { useState, useEffect } from 'react';
import Landing from './Components/Landing'
function App() {
  //Hook to set the landing pages text state
  const [ weatherState, setWeatherState] = useState(
    {
      city:null,
      high:null,
      low:null,
      currentCondition:null

    })

  //Hook to set which city we initially fetch and updates when we click the submit button
  const [ city, setCity] = useState('Austin');

  //Hook that contains the five day weather information
  const [ fiveDayWeather, setFiveDayWeather ] = useState([]);

  //Magic numbers to adjust the temperature from kelvins to farenheight
  const kcFrac = 9/5;
  const kcSub = 459.67;

  //Fetching the open weather API for data
  function fetchWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=649c293108206310e295f6c2a84975dc`)
    //receive our Data and turn it into json
      .then((response) => response.json())
    //We then use that json Data to set the weathers state so
    //it displays on the landing page
      .then(weatherData => {
        return setWeatherState({
          city:weatherData.name,
          high: Math.ceil(weatherData.main.temp_max * kcFrac - kcSub),
          low: Math.ceil(weatherData.main.temp_min * kcFrac - kcSub),
          currentCondition: weatherData.weather[0].description
        });
      })
  }

//Fetching the 5 day forecast from the open weather api
//follows the same logic as fetchWeather
  function fetchForecast() {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=649c293108206310e295f6c2a84975dc`)
    .then((response) => response.json())
    .then(data=> { return setFiveDayWeather(data.list);
    })
  }

//Calls our fetch functions on initial load
  useEffect(() => {
    //An asyncronous function that promises to resolve the fetches.
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

  //Fetches the API's again but with users chosen city instead.
    const handleSubmit = (evt) => {
     evt.preventDefault();
     fetchWeather()
     fetchForecast()
    }

    //Takes the data from the fiveDayWeater array and only
    //returns days that have a tim of '00:00:00'
    const filteredDates = fiveDayWeather.filter(data=>{
        let timePattern = '00:00:00'
        return data.dt_txt.includes(timePattern)
    })

    //We then use that filtered data to display an amount of forecasts equal to the size of the filteredDates array which is 5
    const weatherCards = filteredDates.map((data, ind) => {
   
        return <div key={ind} className="weatherCards">Date {data.dt_txt}<br/> the weather today will be {data.weather[0].description}</div>

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