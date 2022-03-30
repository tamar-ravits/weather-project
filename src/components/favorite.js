import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getCurrentWeather, initiateCurrentWeather } from '../redux/actions/weatherAction'
import '../App.css'

const mapStateToProps = (state) => {
    const { favoriteCities, apiKey } = state;
    return {
        favoriteCities,
        apiKey
    }
}

function Favorite(props) {
    const { favoriteCities, apiKey, dispatch } = props;
    const navigate = useNavigate();

    const navigateToHome = (e, currentCity) => {
        dispatch(initiateCurrentWeather());
        console.log('currentCity', currentCity);
        dispatch(getCurrentWeather(currentCity.id, currentCity.nameCity, apiKey));
        navigate('/home');
    }

    return (
        <div className='container-fluid'>
            <div className='row d-flex justify-content-center align-items-center row-favorite' >
                {favoriteCities.length > 0 &&
                    favoriteCities.map(currentCity => {
                        return (
                            <div className="card text-white mb-3 cursor-pointer" onClick={(e) => navigateToHome(e, currentCity)} >
                                <div class="card-header">{currentCity.nameCity}</div>
                                <div class="card-body">
                                    <p class="card-title">{currentCity.weatherText}</p>
                                    <p class="card-text">{currentCity.temperature}</p>
                                </div>
                            </div>)
                    })}
            </div>
        </div>
    )
}
export default connect(mapStateToProps)(Favorite)
