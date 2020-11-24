import React from 'react';
import './House.css';
import PropTypes from 'prop-types';

const House = (props) => {
  let values = 
    `${props.details.value1}, 
    ${props.details.value2}, 
    ${props.details.value3}, & 
    ${props.details.value4} `;
  
  let colors = `${props.details.color1} & ${props.details.color2}`;

  return (
    <section className='house-details-section'>
      <article className='house-details-wrapper'>
        <h1 className='house-name'>{props.details.name}</h1>
        <h2 className='detail-heading'>Head:</h2> 
        <h3 className='house-detail'>{props.details.headOfHouse}</h3>
        <h2 className='detail-heading'>Founder:</h2> 
        <h3 className='house-detail'>{props.details.founder}</h3>
        <h2 className='detail-heading'>Ghost:</h2> 
        <h3 className='house-detail'>{props.details.houseGhost}</h3>
        <h2 className='detail-heading'>Mascot:</h2>
        <h3 className='house-detail'>{props.details.mascot}</h3>
        <h2 className='detail-heading'>Values:</h2>
        <h3 className='house-detail'>{values}</h3>
        <h2 className='detail-heading'>Colors:</h2>
        <h3 className='house-detail'>{colors}</h3>
      </article>
    </section>
  )
}

export default House;

House.propTypes = {
  details: PropTypes.object.isRequired
}
