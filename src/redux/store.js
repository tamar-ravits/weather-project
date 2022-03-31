import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherDetailsReducer from './reducer/weatherDetailsReducer';
const initialState = { detailsCurrentWeather: { currentCity: 'Tel Aviv' }, favoriteCities: [], apiKey: 'jmUlDpAmIaFyDk5qg5xLrAI1lEkqAVpE', isFailed: false };
const store = createStore(weatherDetailsReducer, initialState, applyMiddleware(thunk))
export default store;