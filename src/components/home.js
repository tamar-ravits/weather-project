import React from 'react'
import SearchInput from './searchInput'
import DetailsWeather from './detailsWeather';
import ErrorModal from './errorModal';
import * as Actions from '../redux/actions/weatherAction'
import '../App.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    const { errorModal, apiKey } = state;
    return {
        errorModal, apiKey
    }
}
function Home(props) {
    const { errorModal, apiKey } = props

    const handleClose = () => {
        props.dispatch(Actions.initiateCurrentWeather())
        props.dispatch(Actions.getLocationIdByName(apiKey, 'Tel Aviv'))
        props.dispatch(Actions.openErrorModal({ isOpen: false }))
    }

    return (
        <>
            <div className='row d-flex justify-content-center align-items-center wrap-search' >
                <SearchInput />
            </div>
            <div className='row content-details-weather' >
                {errorModal && errorModal.isOpen ?
                    <ErrorModal handleModalClose={handleClose} detailsErrorModal={errorModal} /> :
                    <DetailsWeather />
                }
            </div>

        </>
    );
}
export default connect(mapStateToProps)(Home)