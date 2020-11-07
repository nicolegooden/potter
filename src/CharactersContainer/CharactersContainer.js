import React from 'react';
import './CharactersContainer.css';
import CharacterCard from '../CharacterCard/CharacterCard';

const CharactersContainer = (props) => {
  let message;
  const allCharacters = props.studentsByHouse.map(char => {
    return (
      <CharacterCard 
        id={char._id}
        name={char.name}
        bloodStatus={char.bloodStatus}
        species={char.species}
        setCharacter={props.setCharacter}
      />
    )
  })

  if (props.myCharacter) {
    message = (
      <article className='message-and-button'>
        <h1 className='characters-container-message'>You've selected {props.myCharacter.name}</h1>
        <button className='finalize-character-button'>finalize</button>
      </article>)
  } else {
    message = <h1 className='characters-container-message'>Select a character</h1>
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