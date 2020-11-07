import React from 'react';
import './HomePage.css';
import sortingHat from '../sorting-hat-image.png'

const HomePage = (props) => {
  let message;
  if (!props.house) {
    message = <h1 className='welcome'>Welcome, 1st Year!</h1>
  } else {
    message = <h1 className='welcome'>You are... {props.house}!</h1>
  }

  return (
    <section className='homepage-container'>
      {message}
      <img className='sorting-hat-image' src={sortingHat} alt='sorting hat'/>
      {props.changeHomePageButton()}
    </section>
  )
}

export default HomePage;