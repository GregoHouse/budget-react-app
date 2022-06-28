import React from 'react';
import image from './assets/alkemyLogo.png';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className='topBar-container'>
        <div className='img-logo-container'>
        <img className='logo-alkemy' src={image} alt='logo'  height={'100px'} ></img>
        </div>
        <div className='home-create-container'>
        <Link className='home-link' to='/'>Home</Link>
        <Link className='create-link' to='/operation/create'>Create</Link>
        </div>

    </div>
  )
}

export default TopBar