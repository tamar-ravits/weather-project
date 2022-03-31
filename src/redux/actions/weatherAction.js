import { createActionTypes, createActionCreator } from '../../utils/util';

export const weatherDetailsActions = createActionTypes([
    'GET_CURRENT_DETAILS_SUCCESS',
    'GET_CURRENT_DETAILS_FAILURE',
    'GET_DAILY_FORECAST',
    'ADD_FAVORITE_CITY',
    'REMOVE_FAVORITE_CITY',
    'INITIATE_CURRENT_WEATHER',
    'OPEN_ERROR_MODAL',
    'SET_DEFAULT_CURRENT_CITY'
]);

export const addFavoriteCity = createActionCreator(weatherDetailsActions.ADD_FAVORITE_CITY);
export const removeFavoriteCity = createActionCreator(weatherDetailsActions.REMOVE_FAVORITE_CITY);
const getCurrentDetailsSuccess = createActionCreator(weatherDetailsActions.GET_CURRENT_DETAILS_SUCCESS);
const getDailyForecast = createActionCreator(weatherDetailsActions.GET_DAILY_FORECAST);
export const openErrorModal = createActionCreator(weatherDetailsActions.OPEN_ERROR_MODAL);
export const initiateCurrentWeather = createActionCreator(weatherDetailsActions.INITIATE_CURRENT_WEATHER);
export const setDefaultCurrentCity = createActionCreator(weatherDetailsActions.SET_DEFAULT_CURRENT_CITY)


const mappingCurrentDetails = function (detailsCurrentWeather, city, Id) {
    const { Temperature, WeatherText } = detailsCurrentWeather[0];
    return {
        temperature: Temperature.Metric.Value,
        weatherType: WeatherText,
        currentCity: city,
        id: Id
    }
}

const mappingDailyForecast = function (dailyForecasts) {
    const mappingDailyForecasts = dailyForecasts.map(day => {
        const { Date, Temperature, Day } = day
        return {
            date: Date,
            minTemp: Temperature.Minimum.Value,
            maxTemp: Temperature.Maximum.Value,
            weatherType: Day.IconPhrase
        }
    })
    return mappingDailyForecasts;

}

export const getCurrentWeather = function (locationKey, currentCity, apiKey) {
    return (dispatch) => {
        const fetch1 = fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/locationKey=${locationKey}?apikey=${apiKey}`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                dispatch(openErrorModal({ isOpen: true, title: 'failed To retrieve data...' }))
            }).catch(err => {
                dispatch(openErrorModal({ isOpen: true, title: 'error with apiKey , pls replace apiKey...', disabled: true }));
            })
        const fetch2 = fetch(
            `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                dispatch(openErrorModal({ isOpen: true, title: 'failed To retrieve data...' }))
            })
            .catch(err => {
                dispatch(openErrorModal({ isOpen: true, title: 'error with apiKey , pls replace apiKey...', disabled: true }));
            })
        const parallelCalls = [
            fetch1, fetch2
        ];
        Promise.all(parallelCalls)
            .then((res) => {
                const mappingDetailsCurrentWeather = mappingCurrentDetails(res[0], currentCity, locationKey);
                dispatch(getCurrentDetailsSuccess(mappingDetailsCurrentWeather));
                const generalWeather = res[1].Headline.Text;
                const mappingDailyForecast5days = mappingDailyForecast(res[1].DailyForecasts)
                dispatch(getDailyForecast({ dailyForecasts: mappingDailyForecast5days, generalWeather: generalWeather }));
            })
            .catch(err => console.log(err))
    }
}

export const getLocationIdByName = function (apiKey, city) {
    return (dispatch) => {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                dispatch(openErrorModal({ isOpen: true, title: 'failed To retrieve data...' }))
            }).catch((err) => {
                dispatch(openErrorModal({ isOpen: true, title: 'error with apiKey , pls replace apiKey...', disabled: true }));
            })
            .then((res) => {
                const locationKey = res[0].Key + '_PC';
                dispatch(getCurrentWeather(locationKey, city, apiKey))
            }
            );
    }
}
