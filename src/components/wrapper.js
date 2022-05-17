import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Home from './home';
import Header from './header';
import '../App.css'

export default function Wrapper() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home');
    }, [])

    return (
        <div className="container-fluid">
            <div className='row header'>
                <Header />
            </div>
            <div className='row row-content '>
                <Home />
            </div>
        </div >
    );
}