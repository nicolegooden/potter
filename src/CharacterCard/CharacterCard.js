import React from 'react';

const CharacterCard = (props) => {
  return (
    <article className='character-section'>
      <h1 className='character-name'>{props.name}</h1>
      <h2 className='character-blood-status'>Blood Status: {props.bloodStatus}</h2>
      <h2 className='character-species'>Species: {props.species}</h2>
    </article>
  )
}

export default CharacterCard;