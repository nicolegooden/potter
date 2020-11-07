import React from 'react';
import './CharactersContainer.css';
import CharacterCard from '../CharacterCard/CharacterCard';

const CharactersContainer = (props) => {
  let chosenCharacterText;
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
    chosenCharacterText = <h1 className='chosen-character-text'>You've chosen {props.myCharacter.name}</h1>
  }

  return (
      <section className='characters-container'>
        {chosenCharacterText}
        <section className='all-characters-section'>
          {allCharacters}
        </section>
      </section>
  )
}

export default CharactersContainer;