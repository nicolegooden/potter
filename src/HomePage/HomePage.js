import React from 'react';
import './HomePage.css';
import sortingHat from '../sorting-hat-image.png'

const HomePage = (props) => {
  return (
    <section className='homepage-container'>
      <h1 className='welcome'>Welcome, 1st Year!</h1>
      <img className='sorting-hat-image' src={sortingHat} alt='sorting hat'/>
      <button className='house-button'>find my house</button>
    </section>
  )
}

export default HomePage;