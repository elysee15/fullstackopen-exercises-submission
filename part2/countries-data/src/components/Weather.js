import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Weather({ capital }){
    const [weather, setWeather] = useState({});

    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
       axios
        .get(`${BASE_URL}current?access_key=${API_KEY}&query=${capital}`)
        .then(res => {
            setWeather(res.data.current)
        })
        .catch(err => {console.warn(err)})
    },[])

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p> 
                <strong>temperature:</strong> {weather.temperature} Celcius
            </p>
            <img src={weather.weather_icons} alt='weather icon'/>
            <p>
                <strong>wind:</strong> {weather.wind_degree} mph direction {weather.wind_dir}
            </p>
        </div>
    )
}