import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherDetailsReducer from './reducer/weatherDetailsReducer';
const initialState = { detailsCurrentWeather: { currentCity: 'Tel Aviv' }, favoriteCities: [], apiKey: 'zzw59dMkhMqCmCLNFCTfd5jnz3EPnjV8', isFailed: false };
const store = createStore(weatherDetailsReducer, initialState, applyMiddleware(thunk))
export default store;