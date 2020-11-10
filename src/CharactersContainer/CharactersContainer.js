import React from 'react';
import './CharactersContainer.css';
import CharacterCard from '../CharacterCard/CharacterCard';
import PropTypes from 'prop-types';

const CharactersContainer = (props) => {
  let message;
  const allCharacters = props.studentsByHouse.map(char => {
    return (
      <CharacterCard 
        key={char._id}
        id={char._id}
        name={char.name}
        bloodStatus={char.bloodStatus}
        species={char.species}
        setTempCharacterDetails={props.setTempCharacterDetails}
        myCharacter={props.myCharacter}
      />
    )
  })

  if (props.myName && !props.myCharacter) {
    message = (
      <article className='message-article'>
        <h1 className='characters-container-message'>You've selected {props.myName}</h1>
        <button onClick={() => props.setCharacter(props.myID)} className='finalize-character-button'>finalize</button>
      </article>)
  } else if (props.myCharacter) {
    message = (
    <article className='message-article'>
      <h1 className='characters-container-message'>Welcome, {props.myCharacter.name}</h1>
    </article>)
  } else if (props.house) {
    message = <h1 className='characters-container-message'>Select a character</h1>
  } else {
    message = <h1 className='characters-container-message'>Get sorted & come back to select a character from your house!</h1>
  }

  return (
      <section className='characters-container'>
        {message}
        <section className='all-characters-section'>
          {allCharacters}
        </section>
      </section>
  )
}

export default CharactersContainer;

CharactersContainer.propTypes = {
  house: PropTypes.string.isRequired,
  studentsByHouse: PropTypes.array.isRequired,
  setCharacter: PropTypes.func.isRequired,
  setTempCharacterDetails: PropTypes.func.isRequired,
  myName: PropTypes.string,
  myCharacter: PropTypes.object,
  myID: PropTypes.string
}