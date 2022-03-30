import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './home';
import Favorite from './favorite';
import '../App.css'

export default function Wrapper() {
    const title = 'Herolo Weather Task'
    const navigate = useNavigate();
    const currentLocation = window.location.href.split('/')[3];

    useEffect(() => {
        navigate('/home');
    }, [])

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-between align-items-center header">
                <div className='title-position font-text'>{title}</div>
                <div className='links-position'>
                    <Link to={{ pathname: '/home' }} className={currentLocation === 'home' ? 'btn link-focus link-home' :
                        'btn btn-light link-home'} >home</Link>
                    <Link to={{ pathname: '/favorite' }} className={currentLocation === 'favorite' ? 'btn link-focus' :
                        'btn btn-light'}>favorite</Link>
                </div>
            </div>
            <div className="row content">
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path='/favorite' element={<Favorite />}></Route>
                </Routes>
            </div>
        </div >
    );
}