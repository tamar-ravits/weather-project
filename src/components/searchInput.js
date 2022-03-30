import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from "react-redux";
import { getCurrentWeather, openErrorModal, getLocationIdByName } from '../redux/actions/weatherAction';

const mapStateToProps = (state) => {
    const { detailsCurrentWeather, apiKey } = state;
    return {
        currentCity: detailsCurrentWeather.currentCity,
        apiKey
    }
}

function SearchInput(props) {
    const { currentCity, dispatch, apiKey } = props;
    const [arr, setArr] = useState([]);
    const [citySearch, setCitySearch] = useState();

    const getListAutoComplete = (e) => {
        setCitySearch(e.target.value)
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${e.target.value}`)
            .then(res => res.json())
            .catch(err => {
                dispatch(openErrorModal(true))
            })
            .then((res) => {
                const mappingCities = res.map(item => {
                    return {
                        id: item.Key + '_PC',
                        value: item.LocalizedName
                    }
                })
                setArr(mappingCities);
            })
    }

    useEffect(() => {
        dispatch(getLocationIdByName(apiKey, currentCity))
    }, [])

    const getDetailsWeather = (e, item) => {
        const locationKey = item.id;
        dispatch(getCurrentWeather(locationKey, item.value, apiKey));
    }

    return (
        <div style={{ width: 'fit-content' }}>
            <Autocomplete
                defaultValue={{ value: currentCity || citySearch }}
                disablePortal
                onChange={(event, item) => getDetailsWeather(event, item)}
                id="combo-box-demo"
                options={arr}
                getOptionLabel={(option) => option.value}
                style={{ width: '30vw' }}
                renderInput={(params) => <TextField {...params} onChange={getListAutoComplete} variant="outlined" />}
            />
        </div>
    )
}
export default connect(mapStateToProps)(SearchInput)