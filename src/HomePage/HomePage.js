import React from 'react';
import './HomePage.css';
import sortingHat from '../sorting-hat-image.png'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomePage = (props) => {
  let message;
  let houseButton;
  let characterButton;
  
  if (!props.house) {
    message = <h1 className='message'>Welcome, 1st Year!</h1>
    houseButton = <button onClick={props.setHouse} className='house-button'>find my house</button>
  } else {
    message = <h1 className='message'>You are... {props.house}!</h1>
    houseButton = <button className='house-button'>learn about {props.house}</button>
    characterButton = (
      <Link to='/characters' className='character-container'>
        <button onClick={props.getStudentsByHouse} className='character-button'>choose character</button>
      </Link>
    )
  }

  return (
    <section className='homepage-container'>
      {message}
      <img className='sorting-hat-image' src={sortingHat} alt='sorting hat'/>
      {houseButton}
      {characterButton}
    </section>
  )
}

export default HomePage;

HomePage.propTypes = {
  house: PropTypes.string.isRequired,
  setHouse: PropTypes.func.isRequired
}