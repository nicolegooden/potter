import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CharacterCard from './CharacterCard.js';
import { MemoryRouter } from 'react-router-dom';

describe('Character Card', () => {
  it('should render all expected elements before character selection', () => {

    let mockID = 'ghi789';
    let mockName = 'Hermione Granger';
    let mockBloodStatus = 'muggle-born';
    let mockSpecies = 'human';
    let mockSetTemp = jest.fn();
    let mockMyCharacter = null

    render(
      <MemoryRouter>
        <CharacterCard 
          id={mockID}
          name={mockName}
          bloodStatus={mockBloodStatus}
          species={mockSpecies}
          setTempCharacterDetails={mockSetTemp}
          myCharacter={mockMyCharacter}
        /> 
      </MemoryRouter>
    )

    const name = screen.getByText('Hermione Granger')
    expect(name).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'select'})).toBeInTheDocument()
    expect(screen.getByText('Blood Status: muggle-born')).toBeInTheDocument();
    expect(screen.getByText('Species: human')).toBeInTheDocument();
  })

  it('should no longer render the select button if myCharacter is stored', () => {
    let mockID = 'ghi789';
    let mockName = 'Hermione Granger';
    let mockBloodStatus = 'muggle-born';
    let mockSpecies = 'human';
    let mockSetTemp = jest.fn();
    let mockMyCharacter = {
      _id: 'ghi789',
      name: 'Hermione Granger',
      role: 'student',
      house: 'Gryffindor',
      school: 'Hogwarts',
      ministryOfMagic: false,
      orderOfThePhoenix: true, 
      dumbledoresArmy: true,
      deathEater: false,
      bloodStatus: 'muggle-born',
      species: 'human'
    }

    render(
      <MemoryRouter>
        <CharacterCard 
          id={mockID}
          name={mockName}
          bloodStatus={mockBloodStatus}
          species={mockSpecies}
          setTempCharacterDetails={mockSetTemp}
          myCharacter={mockMyCharacter}
        /> 
      </MemoryRouter>
    )

    const name = screen.getByText('Hermione Granger');
    expect(name).toBeInTheDocument();
    expect(screen.queryByText('select')).toBeNull()
    expect(screen.getByText('Blood Status: muggle-born')).toBeInTheDocument();
    expect(screen.getByText('Species: human')).toBeInTheDocument();
  })

  it('should fire prop method when select button is clicked', () => {
    let mockID = 'ghi789';
    let mockName = 'Hermione Granger';
    let mockBloodStatus = 'muggle-born';
    let mockSpecies = 'human';
    let mockSetTemp = jest.fn();
    let mockMyCharacter = null;

    render(
      <MemoryRouter>
        <CharacterCard 
          id={mockID}
          name={mockName}
          bloodStatus={mockBloodStatus}
          species={mockSpecies}
          setTempCharacterDetails={mockSetTemp}
          myCharacter={mockMyCharacter}
        /> 
      </MemoryRouter>
    )

    const name = screen.getByText('Hermione Granger');
    expect(name).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'select'})).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: 'select'}));
    expect(mockSetTemp).toHaveBeenCalledTimes(1);

  })
})