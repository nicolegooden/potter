import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CharactersContainer from './CharactersContainer.js';
import { MemoryRouter } from 'react-router-dom';

describe('Characters Container', () => {
   
  let mockStudentsByHouse;

  beforeEach(() => {
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
    expect(screen.getByTestId('select button for Harry Potter')).toBeInTheDocument();
    expect(screen.getByTestId('select button for Ginny Weasley')).toBeInTheDocument();
    expect(screen.getByTestId('select button for Neville Longbottom')).toBeInTheDocument();
    expect(screen.getByTestId('select button for Hermione Granger')).toBeInTheDocument();
    expect(screen.getByTestId('select button for Parvati Patil')).toBeInTheDocument();
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

  it('should show the character selected based on props', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
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

  it('should call setCharacter when user finalizes character selection', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
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
    userEvent.click(screen.getByRole('button', {name: 'finalize'}));
    expect(mockSetCharacter).toHaveBeenCalledTimes(1);
    expect(mockSetCharacter).toHaveBeenCalledWith('abc123');
  })

  it('should remove select button from all cards myCharacter exists', async () => {
    const mockHouse = 'Gryffindor';
    const mockSetCharacter = jest.fn();
    const mockSetTemp = jest.fn();
    const mockMyName = 'Harry Potter';
    const mockMyID = 'abc123';
    const mockMyCharacter = {
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
    }

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
    expect(screen.getByText('Welcome, Harry Potter')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'finalize'})).toBeNull();
    expect(screen.queryByRole('button', {name: 'select'})).toBeNull();
  })

  it('should allow user to select different characters before finalizing', async () => {
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
    expect(mockSetTemp).toHaveBeenCalledWith('Harry Potter', 'abc123');
    userEvent.click(screen.getByTestId('select button for Hermione Granger'));
    expect(mockSetTemp).toHaveBeenCalledTimes(2);
    expect(mockSetTemp).toHaveBeenCalledWith('Hermione Granger', 'ghi789');
  })
})