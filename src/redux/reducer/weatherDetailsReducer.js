import { weatherDetailsActions } from '../actions/weatherAction'

export default function weatherDetailsReducer(state = {}, action) {
    const { type, payload } = action || { payload: {} };
    let nextState;
    switch (type) {
        case weatherDetailsActions.GET_CURRENT_DETAILS_SUCCESS:
            nextState = { ...state, detailsCurrentWeather: payload }
            break;
        case weatherDetailsActions.GET_DAILY_FORECAST:
            nextState = { ...state, detailsDailyForecast: payload }
            break;
        case weatherDetailsActions.GET_CURRENT_DETAILS_FAILURE:
            nextState = { ...state, ...payload };
            break;
        case weatherDetailsActions.ADD_FAVORITE_CITY:
            nextState = { ...state, favoriteCities: [...state.favoriteCities, payload] };
            break;
        case weatherDetailsActions.REMOVE_FAVORITE_CITY:
            nextState = { ...state, favoriteCities: payload };
            break;
        case weatherDetailsActions.INITIATE_CURRENT_WEATHER:
            nextState = { ...state, detailsCurrentWeather: {}, detailsDailyForecast: [] };
            break;
        case weatherDetailsActions.OPEN_ERROR_MODAL:
            nextState = { ...state, errorModal: payload };
            break;
        case weatherDetailsActions.SET_DEFAULT_CURRENT_CITY:
            nextState = { ...state, detailsCurrentWeather: { ...state.detailsCurrentWeather, currentCity: payload } };
            break;
        default:
            nextState = state;
            break;
    }
    return nextState;
}
