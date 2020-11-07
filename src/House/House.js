import React from 'react';
import './House.css';

const House = (props) => {
  let values = props.details.values.map(value => {
    return `${value} `;
  })

  let colors = props.details.colors.map(color => {
    return `${color} `;
  })

  return (
    <section className='house-details-section'>
      <article className='house-details-wrapper'>
        <h1 className='house-detail house-name'>{props.details.name}</h1>
        <h2 className='house-detail'>Head: {props.details.headOfHouse}</h2>
        <h2 className='house-detail'>Founder: {props.details.founder}</h2>
        <h2 className='house-detail'>Ghost: {props.details.houseGhost}</h2>
        <h2 className='house-detail'>Mascot: {props.details.mascot}</h2>
        <h2 className='house-detail'>Values: {values}</h2>
        <h2 className='house-detail'>Colors: {colors}</h2>
      </article>
    </section>
  )
}

export default House;