import React from 'react';
import './CharactersContainer.css';
import CharacterCard from '../CharacterCard/CharacterCard';

const CharactersContainer = (props) => {
  const allCharacters = props.studentsByHouse.map(char => {
    return (
      <CharacterCard 
        name={char.name}
        bloodStatus={char.bloodStatus}
        species={char.species}
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