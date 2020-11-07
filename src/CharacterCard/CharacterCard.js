import React from 'react';
import './CharacterCard.css';

const CharacterCard = (props) => {
  let button;
  if (!props.myCharacter) {
    button = <button onClick={() => props.setTempCharacterDetails(props.name, props.id)} className='select-button'>select</button>
  }
  return (
    <article className='character-article'>
      <h1 className='character-name'>{props.name}</h1>
      <h3 className='character-blood-status'>Blood Status: {props.bloodStatus}</h3>
      <h3 className='character-species'>Species: {props.species}</h3>
      <div className='button-wrapper'>
        {button}      
      </div>
    </article>
  )
}

export default CharacterCard;