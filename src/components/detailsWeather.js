import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/weatherAction'
import '../App.css'

const mapStateToProps = (state) => {
    const { detailsCurrentWeather, detailsDailyForecast, favoriteCities } = state;
    return {
        favoriteCities,
        detailsCurrentWeather,
        detailsDailyForecast,
    }
}

function DetailsWeather(props) {
    const { favoriteCities, detailsCurrentWeather, detailsDailyForecast, dispatch } = props;
    const { currentCity, weatherType, id, temperature } = detailsCurrentWeather;
    const [isFavorite, setIsFavorite] = useState();
    const titleWeather = detailsDailyForecast && detailsDailyForecast.generalWeather
    const addToFavorite = 'add to favorite';
    const removeFromFavorite = 'remove from favorite';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const indexFavorite = favoriteCities.findIndex(x => x.nameCity === currentCity);
        setIsFavorite(indexFavorite < 0 ? false : indexFavorite + 1);
    }, [currentCity])

    const updateFavoriteCities = () => {
        const favoriteCitiesCopy = [...favoriteCities];
        if (!isFavorite) {
            setIsFavorite(true)
            dispatch(Actions.addFavoriteCity({
                id: id,
                nameCity: currentCity,
                weatherText: weatherType,
                temperature: temperature
            }))
        } else {
            setIsFavorite(false)
            favoriteCitiesCopy.splice(isFavorite - 1, 1);
            dispatch(Actions.removeFavoriteCity(favoriteCitiesCopy))
        }

    }

    return (
        <div className='container wrapper-details-weather'>
            <div className='row d-flex flex-row justify-content-between wrap-details'>
                <span className='wrap-favorite-details-weather' >
                    <h5 className='font-text'>{detailsCurrentWeather.currentCity}</h5>
                    <h5 className='font-text'>
                        {detailsCurrentWeather && detailsCurrentWeather.temperature}
                    </h5>
                </span>
                <div className='d-flex flex-row wrap-favorite-details-weather'>
                    <div className='wrap-icon'>
                        <i class="fa fa-heart fa-2x"
                            style={isFavorite ? { color: '#e15f75' } : { color: 'gray' }}>
                        </i>
                    </div>
                    <div>
                        <button className="font-text" onClick={updateFavoriteCities}>
                            {isFavorite ? removeFromFavorite : addToFavorite}
                        </button>
                    </div>
                </div>
            </div>
            <div className='row wrap-title'>
                <h1 className='font-text' >{titleWeather}</h1>
            </div>
            <div className='row d-flex justify-content-center wrap-cards' >
                {detailsDailyForecast && detailsDailyForecast.dailyForecasts &&
                    detailsDailyForecast.dailyForecasts.map((day) => {
                        const dayOfWeek = days[new Date(day.date).getDay()];
                        return (
                            <div className="card text-white mb-3" >
                                <div class="card-header">{dayOfWeek}</div>
                                <div class="card-body">
                                    <p class="card-title">min: {day.minTemp}</p>
                                    <p class="card-title">max: {day.maxTemp}</p>
                                    <p class="card-text">{day.weatherType}</p>
                                </div>
                            </div>)
                    })}
            </div>
        </div >
    )
}
export default connect(mapStateToProps)(DetailsWeather)