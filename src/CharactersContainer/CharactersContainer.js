import React from 'react';
import './CharactersContainer.css';
import CharacterCard from '../CharacterCard/CharacterCard';

const CharactersContainer = (props) => {
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
  return (
    <section className='all-characters-section'>
      {allCharacters}
    </section>
  )
}

export default CharactersContainer;