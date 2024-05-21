import React, { useEffect, useState } from 'react'
import darkImage from '../../Assest/darkImage.png'
import lightImage from '../../Assest/lightImage.png'
import './UserInterface.css';

const UserInterface = ({ data }) => {
    const [currentTime ,setCurrentTime] =useState(false);
    const [isDay ,setIsDay] = useState(true)
    const [isFine ,setIsFine] = useState(true);
    const [weatherDetail, setWeatherDetail] = useState({
        temp: null, image: null, location: null, country: null, temp_f: null, wind_kph: null, condition: null, humidity: null
    })

    useEffect(() => {
        if (data) {
            setWeatherDetail({ ...weatherDetail, temp: data.current.temp_c, image: data.current.condition.icon, location: data.location.name, country: data.location.country, temp_f: data.current.temp_f, wind_kph: data.current.wind_kph, condition: data.current.condition.text, humidity: data.current.humidity })
        }
    }, [])


    const current_time = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM based on hours
    
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
    
        const currentDayInfo = hours >= 6 && hours < 18; // Check if it's day or night
    
        setIsDay(currentDayInfo); // Assuming setIsDay is a function to set the state
        return `${year}-${month}-${day} | ${hours}:${minutes}:${seconds} ${ampm}`;
    }
    
    
  
  setInterval(() => {
    setCurrentTime(current_time())
  }, 1000);
  



// Define a constant for minimal precipitation threshold (in millimeters)
const MINIMAL_PRECIPITATION_THRESHOLD = 1;

// Function to check if temperature is within a comfortable range
const isTemperatureFine = (temperature) => temperature >= 22 && temperature <= 45;

// Function to check if precipitation is minimal
const isPrecipitationFine = (precipitation) => precipitation <= MINIMAL_PRECIPITATION_THRESHOLD;

// Main function to analyze weather
const analyzeWeather = (weatherData) => {
    if (!weatherData || typeof weatherData !== 'object') {
        console.error('Invalid or missing weather data.');
        return false;
    }

    const { current: { temp_c: temperatureCelsius, precip_mm: precipitation } } = weatherData;

    const isWeatherFine = isTemperatureFine(temperatureCelsius) && isPrecipitationFine(precipitation);

    if (isWeatherFine) {
        console.log('The weather is fine.');
    } else {
        console.log('The weather is not fine.');
    }

    return isWeatherFine;
};







  const checkWeatherIsFine = async () => {
    const weatherData = await data;
    const weatherReport = await analyzeWeather(weatherData);
    setIsFine(weatherReport);
    console.log("Weather report is the ",isFine)
  };
  
  checkWeatherIsFine();  

    return (
        <>

     <div className="user-main-class" style={{ backgroundImage: isDay&&isFine  ? `url(${lightImage})` : `url(${darkImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

                <div className="container"style={{ backgroundColor: isDay&&isFine ? 'black' :'white',color:isDay&&isFine  ? 'white':'black'}}>
                    <div className="temp-and-image">
                        <div className="temp">
                            {weatherDetail.temp} °C
                        </div>
                        <div className="image">
                            <img src={weatherDetail.image} alt="Image" />
                        </div>
                    </div>

                    <div className="weather-description">
                        <div className="location for-padding">
                            City : {weatherDetail.location}
                        </div>
                        <div className="country for-padding">
                            Country : {weatherDetail.country}
                        </div>
                        <div className="humidity for-padding">
                            Humidity : {weatherDetail.humidity}
                        </div>
                        <div className="temp_f for-padding">
                            Feranite : {weatherDetail.temp_f}
                        </div>
                        <div className="wind_kph for-padding">
                            Wind KPH : {weatherDetail.wind_kph}
                        </div>
                        <div className="condition for-padding">
                            Condition : {weatherDetail.condition}
                        </div>
                        <div className="current-time for-padding">
                            {currentTime}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInterface