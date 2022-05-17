import React, { useState, useEffect } from 'react'
import '../App.css'
import CardDetailsWeather from './cardDteisWeather';

export default function Home() {
    const apiKey = '7ae8ccfbb3c794652c1916af0004862d';
    const lang = 'he';
    const [cities, setCities] = useState(['London', 'New york', 'Alaska', 'Eilat', 'Pariz', 'Madrid', 'Milano'])

    const mapDetailsWeather = (detailsWeather) => {
        const citiesWeather = detailsWeather && detailsWeather.map((city) => (
            {
                name: city.name,
                description: city.weather && city.weather[0].description,
                temp: Math.round(city.main && city.main.temp),
                feels_like: Math.round(city.main && city.main.feels_like),
                humidity: city.main && city.main.humidity
            }
        ))
        setCities(citiesWeather)
    }

    const getWeatherByCityName = async () => {
        const promises = await Promise.all(cities.map(city =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`)));
        const citiesDetails = await Promise.all(promises.map(p => p.json()));
        mapDetailsWeather(citiesDetails);
    }

    useEffect(() => {
        getWeatherByCityName();
    }, [])



    return (
        <>
            {/* <div className='wrap-list'> */}
                {cities.map((city) => {
                    return (
                        <CardDetailsWeather city={city} />
                    )
                })}
            {/* </div> */}
        </>
    );
}
