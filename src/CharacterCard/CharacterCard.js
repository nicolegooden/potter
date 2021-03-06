import React from 'react';
import './CharacterCard.css';
import PropTypes from 'prop-types';

const CharacterCard = (props) => {
  let button;
  if (!props.myCharacter && props.house) {
    button = 
      <button 
        data-testid={`select button for ${props.name}`}  
        onClick={() => props.setTempCharacterDetails(props.name, props.id)} 
        className='select-button'>
          select
      </button>
  }
  return (
    <article className='character-article'>
      <h1 className='character-name'>{props.name}</h1>
      <h3 className='character-blood-status'>Blood Status: {props.bloodStatus}</h3>
      <h3 className='character-species'>Species: {props.species}</h3>
      {!props.house && <h3 className='character-role'>Role: {props.role}</h3>}
      {!props.house && <h3 className='character-house'>House: {props.myHouse}</h3>}
      <div className='button-wrapper'>
        {button}      
      </div>
    </article>
  )
}

export default CharacterCard;

CharacterCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  bloodStatus: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  setTempCharacterDetails: PropTypes.func.isRequired,
  myCharacter: PropTypes.object
}