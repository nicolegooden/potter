import React from 'react';
import './HomePage.css';
import sortingHat from '../sorting-hat-image.png'

const HomePage = (props) => {
  return (
    <section className='homepage-container'>
      <article className='sorting-hat-container'>
        <img className='sorting-hat-image' src={sortingHat} alt='sorting hat'/>
      </article>
    </section>
  )
}

export default HomePage;