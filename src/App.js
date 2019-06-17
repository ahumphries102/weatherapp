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
  const [ zipCode, setZipCode ] = useState ('78745') 
  const kc = 9/5 - 459.67
  const fetchData = async () => {
    try{
    await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=649c293108206310e295f6c2a84975dc`)
    .then( getData => getData.json())
    .then( useData => setWeatherState({city:useData.name, zip:Math.ceil(useData.main.temp * 9/5 - 459.67), high:useData.main.temp_max * 9/5 - 459.67, low:useData.main.temp_min * 9/5 - 459.67, currentCondition:useData.weather[0].description }))
  }
  catch(error){
    console.log(error)
  }
  }
    fetchData()
    return (
      <div>
      <Landing city={weatherState.city} temperature={weatherState.zip} high={weatherState.high} low={weatherState.low} currentCondition={weatherState.currentCondition}/>
      <input/>
      <button onClick={()=>{}}> Fetch </button>
      </div>
    );
}

export default App;
