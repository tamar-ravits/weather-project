import React from 'react';
import '../App.css'

export default function CardDetailsWeather({ city }) {

    const fields = {
        temp_field: 'טמפרטורה נמדדת',
        feels_like_fiels: 'טמפרטורה מורגשת',
        humidity_field: 'לחות'
    }

    const renderIconByTemp = (temp) => {
        if (temp < 20) {
            return (<svg color='darkturquoise' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z" />
            </svg>)
        } else {
            if (temp > 30) {
                return (
                    <svg className='icon' color='yellow' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                    </svg>
                )
            } else {
                return (<svg color='blue' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cloudy-fill" viewBox="0 0 16 16">
                    <path d="M13.405 7.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 13H13a3 3 0 0 0 .405-5.973z" />
                </svg>)
            }
        }
    }

    return (
        <div className='wrap-card col-6' >
            <div className="card text-white bg-primary mb-3" >
                <div className="card-header font-text">
                    {city.name}
                    {renderIconByTemp(city.temp)}
                </div>
                <div class="card-body">
                    <h5 class="card-title font-text">
                        {city.description}
                    </h5>
                    <div class="card-text font-text row ">
                        <span className='col'>
                            <p className='free_text font-text'>{fields.temp_field}</p>
                            <span className='wrapper-temp'>
                                <p className='data-weather font-text'> C&deg; </p>
                                <p className='data-weather font-text'>{city.temp}
                                </p>
                            </span>
                        </span>
                        <span className='col'>
                            <p className='free_text font-text'>{fields.feels_like_fiels}</p>
                            <span className='wrapper-temp'>
                                <p className='data-weather font-text'> C&deg; </p>
                                <p className='data-weather font-text'> {city.feels_like} </p>
                            </span>

                        </span>
                        <span className='col'>
                            <p className='free_text font-text'>{fields.humidity_field}</p>
                            <p className='data-weather font-text'> {city.humidity}%</p>
                        </span>

                    </div>
                </div>
            </div></div>
    );
}