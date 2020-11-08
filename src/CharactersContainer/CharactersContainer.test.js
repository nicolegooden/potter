import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CharactersContainer from './CharactersContainer.js';
import { MemoryRouter } from 'react-router-dom';
import { getCharacters } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Characters Container', () => {
   
  let mockStudentsByHouse;

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
            _id: 'nic383',
            name: 'Neville Longbottom',
            bloodStatus: 'pure-blood',
            species: 'human',
            role: 'student',
            house: 'Gryffindor',
          },
          {
            _id: 'dsflj45',
            name: 'Parvati Patil',
            bloodStatus: 'unknown',
            species: 'human',
            role: 'student',
            house: 'Gryffindor',
          },
          {
            _id: 'def456',
            name: 'Ginny Weasley',
            bloodStatus: 'pure-blood',
            species: 'human',
            role: 'student',
            house: 'Gryffindor',
          }
      ])

      mockStudentsByHouse = [
        {
          _id: 'abc123',
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
          _id: 'def456',
          name: 'Ginny Weasley',
          bloodStatus: 'pure-blood',
          species: 'human',
          role: 'student',
          house: 'Gryffindor',
        },
        {
          _id: 'nic383',
          name: 'Neville Longbottom',
          bloodStatus: 'pure-blood',
          species: 'human',
          role: 'student',
          house: 'Gryffindor',
        },
        {
          _id: 'dsflj45',
          name: 'Parvati Patil',
          bloodStatus: 'unknown',
          species: 'human',
          role: 'student',
          house: 'Gryffindor',
        }
      ];
    })  

  it('should render expected elements', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
    const mockStudentsByHouse = [
      {
        _id: 'abc123',
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
        _id: 'def456',
        name: 'Ginny Weasley',
        bloodStatus: 'pure-blood',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        _id: 'nic383',
        name: 'Neville Longbottom',
        bloodStatus: 'pure-blood',
        species: 'human',
        role: 'student',
        house: 'Gryffindor',
      },
      {
        _id: 'dsflj45',
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
    //do more thorough testing with data-testID attribute on each select button
    //  in charactercard component
  })

  it('should fire onClick method with correct arguments based on selecting a card', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
    const mockSetTemp = jest.fn();
    const mockMyName = '';
    const mockMyCharacter = null;
    const mockMyID = '';

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
    userEvent.click(screen.getByTestId('select button for Harry Potter'));
    expect(mockSetTemp).toHaveBeenCalledTimes(1);
    expect(mockSetTemp).toHaveBeenCalledWith('Harry Potter', 'abc123');
  })
})