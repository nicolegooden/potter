import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharactersContainer from './CharactersContainer.js';
import { MemoryRouter } from 'react-router-dom';
import { getCharacters } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Characters Container', () => {

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
          species: 'hero'
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
        },
        {
            id: 'nic383',
            name: 'Neville Longbottom',
            bloodStatus: 'pure-blood',
            species: 'human',
            role: 'student',
            house: 'Gryffindor',
          },
          {
            id: 'dsflj45',
            name: 'Parvati Patil',
            bloodStatus: 'unknown',
            species: 'human',
            role: 'student',
            house: 'Gryffindor',
          },
          {
            id: 'def456',
            name: 'Ginny Weasley',
            bloodStatus: 'pure-blood',
            species: 'human',
            role: 'student',
            house: 'Gryffindor',
          }
      ])
    })  

  it('should render expected elements', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
    const mockStudentsByHouse = [
      {
        id: 'abc123',
        name: 'Harry Potter',
        bloodStatus: 'half-blood',
        species: 'hero',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        _id: 'ghi789',
        name: 'Hermione Granger',
        role: 'student',
        house: 'Gryffindor',
        bloodStatus: 'muggle-born',
        species: 'human'
      },
      {
        id: 'def456',
        name: 'Ginny Weasley',
        bloodStatus: 'pure-blood',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        id: 'nic383',
        name: 'Neville Longbottom',
        bloodStatus: 'pure-blood',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        id: 'dsflj45',
        name: 'Parvati Patil',
        bloodStatus: 'unknown',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      }
    ];
    const mockSetTemp = jest.fn();
    const mockMyName = '';
    const mockMyCharacter = null;
    const mockMyID = ''

    render(
      <MemoryRouter>
        <CharactersContainer 
          house={mockHouse}
          studentsByHouse={mockStudentsByHouse}
          setCharacter={mockSetCharacter}
          setTempCharacterDetails={mockSetTemp}
          myName={mockMyName}
          myCharacter={mockMyCharacter}
          myID={mockMyID}
        />
      </MemoryRouter>
    )

    const name = await waitFor(() => screen.getByText('Ginny Weasley'));
    expect(name).toBeInTheDocument();
    expect(screen.getByText('Neville Longbottom')).toBeInTheDocument();
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Hermione Granger')).toBeInTheDocument();
    expect(screen.getByText('Parvati Patil')).toBeInTheDocument();
    expect(screen.queryByText('Charity Burbage')).toBeNull();
    expect(screen.getByText('Select a character')).toBeInTheDocument();
    expect(screen.queryByText('Draco Malfoy')).toBeNull();
    // expect(screen.getAllByRole('button', {name: 'select'})).toBeInTheDocument();
    // ^ how can I check that this button shows up multiple times?
  })

  it('should render elements based on clicking select on card', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
    const mockStudentsByHouse = [
      {
        id: 'abc123',
        name: 'Harry Potter',
        bloodStatus: 'half-blood',
        species: 'hero',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        _id: 'ghi789',
        name: 'Hermione Granger',
        role: 'student',
        house: 'Gryffindor',
        bloodStatus: 'muggle-born',
        species: 'human'
      },
      {
        id: 'def456',
        name: 'Ginny Weasley',
        bloodStatus: 'pure-blood',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        id: 'nic383',
        name: 'Neville Longbottom',
        bloodStatus: 'pure-blood',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        id: 'dsflj45',
        name: 'Parvati Patil',
        bloodStatus: 'unknown',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      }
    ];
    const mockSetTemp = jest.fn();
    const mockMyName = 'Harry Potter';
    const mockMyCharacter = null;
    const mockMyID = 'abc123';

    render(
      <MemoryRouter>
        <CharactersContainer 
          house={mockHouse}
          studentsByHouse={mockStudentsByHouse}
          setCharacter={mockSetCharacter}
          setTempCharacterDetails={mockSetTemp}
          myName={mockMyName}
          myCharacter={mockMyCharacter}
          myID={mockMyID}
        />
      </MemoryRouter>
    )

    const name = await waitFor(() => screen.getByText('Ginny Weasley'));
    expect(name).toBeInTheDocument();
    expect(screen.getByText('You\'ve selected Harry Potter')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'finalize'})).toBeInTheDocument();
  })
})