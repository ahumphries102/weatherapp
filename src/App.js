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
  const [ zip, setZip] = useState(78745)
  const [ fiveDayWeather, setFiveDayWeather ] = useState()
  const kcFrac = 9/5
  const kcSub = 459.67


    // const fetchData = async () => {
    //   try{
    //   const fetchIp = await fetch(`https://ipapi.co/json/`)
    //   const resolvedIp = await fetchIp.json()
    // }
    //   catch(error){
    //     console.log(error)
    //   }
    // }
 // const fetchWeather = async () => {
 //      try{
 //      const weatherFetch = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=649c293108206310e295f6c2a84975dc`)
 //      const weatherData = await weatherFetch.json()
 //        setWeatherState({city:weatherData.name, zip:Math.ceil(weatherData.main.temp * kcFrac - kcSub), high:Math.ceil(weatherData.main.temp_max * kcFrac - kcSub), low:Math.ceil(weatherData.main.temp_min * kcFrac - kcSub), currentCondition:weatherData.weather[0].description })
 //      }
 //      catch(error){
 //        console.log(error)
 //      }
 //    }

 //    const fetchFiveDay = async () => {
 //      try{
 //        const fetchFiveDayData = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=4254010&appid=649c293108206310e295f6c2a84975dc')
 //       const fiveDayData = await fetchFiveDayData.json()
 //       setFiveDayWeather(fiveDayData.list)
 //       }
 //      catch(error){
 //        console.log('five day error ' + error)
 //      }
 //    }

async function fetchURLs() {
    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all([
        /* Alternatively store each in an array */
        // var [x, y, z] = await Promise.all([
        // parse results as json; fetch data response has several reader methods available:
        //.arrayBuffer()
        //.blob()
        //.formData()
        //.json()
        //.text()
        fetch('http://api.openweathermap.org/data/2.5/weather?zip=78745,us&appid=649c293108206310e295f6c2a84975dc').then((response) => response.json()),// parse each response as json
        fetch('http://api.openweathermap.org/data/2.5/forecast?id=4254010&appid=649c293108206310e295f6c2a84975dc').then((response) => response.json()).then(data=>setFiveDayWeather(data.list))
      ]);

      console.log(data)
      console.log(fiveDayWeather)
      console.log(weatherState)
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(()=>{
     // fetchData()
     // fetchFiveDay()
     // fetchWeather()
     fetchURLs()
    },[])
    console.log(weatherState)
    return (
      <div>
      <Landing city={weatherState.city} temperature={weatherState.zip} high={weatherState.high} low={weatherState.low} currentCondition={weatherState.currentCondition}/>
      <ul>
      {}
      </ul>
      </div>

    );
}

export default App;
