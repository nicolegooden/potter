import React from 'react';
import './HomePage.css';
import sortingHat from '../sorting-hat-image.png'

const HomePage = (props) => {
  let message;
  let houseButton;
  if (!props.house) {
    message = <h1 className='welcome'>Welcome, 1st Year!</h1>
    houseButton = <button onClick={props.setHouse} className='house-button'>find my house</button>
  } else {
    message = <h1 className='welcome'>You are... {props.house}!</h1>
    houseButton = <button className='house-button'>learn about {props.house}</button>
  }

  return (
    <section className='homepage-container'>
      {message}
      <img className='sorting-hat-image' src={sortingHat} alt='sorting hat'/>
      {houseButton}
    </section>
  )
}

export default HomePage;