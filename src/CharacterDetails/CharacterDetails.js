import React from 'react';
import './CharacterDetails.css';

const CharacterDetails = (props) => {
  let boggart;
  if (props.details.boggart) {
    boggart = <h2 className='character-detail'>Boggart: {props.details.boggart}</h2>
  }
  return (
    <section className='my-character-details-section'>
      <h1 className='character-detail character-full-name'>{props.details.name}</h1>
      <h2 className='character-detail'>House: {props.details.house}</h2>
      <h2 className='character-detail'>Blood Status: {props.details.bloodStatus}</h2>
      <h2 className='character-detail'>Species: {props.details.species}</h2>
      {boggart}
      <article className='associations-section'>
       <h2 className='character-detail'>Attending: {props.details.school}</h2>
       <h2 className='associations-heading'>Associations:</h2>
       {props.determineAssociation('dumbledoresArmy')}
       {props.determineAssociation('orderOfThePhoenix')}
       {props.determineAssociation('ministryOfMagic')}
       {props.determineAssociation('deathEater')}
      </article>
    </section>
  )
}

export default CharacterDetails