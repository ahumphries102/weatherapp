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
  const [ zip, setZip ] = useState ('78745') 
  const kcFrac = 9/5
  const kcSub = 459.67

  useEffect(()=>{
    const fetchWeather = async () => {
      try{
      await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=649c293108206310e295f6c2a84975dc`)
      .then( getData => getData.json())
      .then( useData => setWeatherState({city:useData.name, zip:Math.ceil(useData.main.temp * kcFrac - kcSub), high:Math.ceil(useData.main.temp_max * kcFrac - kcSub), low:Math.ceil(useData.main.temp_min * kcFrac - kcSub), currentCondition:useData.weather[0].description }))
      }
      catch(error){
        console.log(error)
      }
    }

    // const fetchData = async () => {
    //   try{
    //   await fetch(`https://api.ipdata.co/?api-key=d988578b4a659594dca1cd6dfd53a54038bdc765e5989b7481b99821`)
    //   .then( getData => getData.json())
    //   .then( useData => setZip(useData.postal))
    //   }
    //   catch(error){
    //     console.log(error)
    //   }
    // }
    //   fetchData()
    //fetchWeather()
  },[])
    return (
      <div>
      <Landing city={weatherState.city} temperature={weatherState.zip} high={weatherState.high} low={weatherState.low} currentCondition={weatherState.currentCondition}/>

          <input
          type='text'
          name='topicBox'
          placeholder='Zip'/>
          <button onClick={(topicBox)=>setZip(topicBox)}>submit</button>
        
      </div>

    );
}

export default App;
