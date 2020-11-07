import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterCard from './CharacterCard.js';
import { MemoryRouter } from 'react-router-dom';
import { getCharacters } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Character Card', () => {
  beforeEach(() => {
    getCharacters.mockResolvedValueOnce([
      {
        _id: 'abc123',
        name: 'Harry Potter',
        role: 'student',
        house: 'Gryffindor',
        school: 'Hogwarts',
        ministryOfMagic: false,
        orderOfThePhoenix: true, 
        dumbledoresArmy: true,
        boggart: 'Dementor',
        deathEater: false,
        bloodStatus: 'half-blood',
        species: 'human'
      },
      {
        _id: 'def456',
        name: 'Draco Malfoy',
        role: 'student',
        house: 'Slytherin',
        school: 'Hogwarts',
        ministryOfMagic: false,
        orderOfThePhoenix: false, 
        dumbledoresArmy: false,
        deathEater: true,
        bloodStatus: 'pure-blood',
        species: 'human'
      },
      {
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
      },
      {
        _id: 'jkl101',
        name: 'Charity Burbage',
        role: 'Professor, Muggle Studies',
        school: 'Hogwarts',
        ministryOfMagic: true,
        orderOfThePhoenix: false, 
        dumbledoresArmy: false,
        deathEater: false,
        bloodStatus: 'unknown',
        species: 'human'
      }
    ])
  })


  it('should render all expected elements before character selection', async () => {

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

    const name = await waitFor(() => screen.getByText('Hermione Granger'))
    expect(name).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'select'})).toBeInTheDocument()
    expect(screen.getByText('Blood Status: muggle-born')).toBeInTheDocument();
    expect(screen.getByText('Species: human')).toBeInTheDocument();
  })

  it('should no longer render the select button if myCharacter is stored', async () => {
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

    const name = await waitFor(() => screen.getByText('Hermione Granger'))
    expect(name).toBeInTheDocument();
    expect(screen.queryByText('select')).toBeNull()
    expect(screen.getByText('Blood Status: muggle-born')).toBeInTheDocument();
    expect(screen.getByText('Species: human')).toBeInTheDocument();
  })
})