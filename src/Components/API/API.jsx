import React, { useEffect, useState } from 'react'
import './API.css'

import UserInterface from '../UserInterface/UserInterface'
const API = () => {

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const Success = (currentLocation) => {
    setLat(currentLocation.coords.latitude)
    setLon(currentLocation.coords.longitude)

  }
  const Failed = () => {
    console.log("There is an issue in fetching the location");
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(Success, Failed)
  }, [])

  const fetchWeatherData = async () => {
    if (lat !== null && lon !== null) {
      const response =await fetch(`http://api.weatherapi.com/v1/current.json?key=c9a4ba849eab4587b2071527242001&q=${lat},${lon}&aqi=no`)
      const data = await response.json();
      setWeatherData(data);
    }

  }
    useEffect(() => {
    fetchWeatherData();
  }, [lat, lon]);

  return (
    <>
    {
      weatherData?
      <div className="call-container">
        <UserInterface data={weatherData}/>
      </div>:
      <div className="loading-container">
        <p>Loading Data...</p>
      </div>
}
    </>
  )
}

export default API
