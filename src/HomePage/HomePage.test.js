import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import HomePage from './Homepage';
import { MemoryRouter } from 'react-router-dom';
import { getSorted } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('HomePage', () => {
  
  let mockHouse;
  let mockSetHouse;
  let mockGetStudentsByHouse;
  let mockMyCharacter;

  beforeEach(() => {
    mockSetHouse = jest.fn();
    mockGetStudentsByHouse = jest.fn();
    getSorted.mockResolvedValueOnce('Ravenclaw');
  })

  it('should render expected elements when user arrives', () => {

    mockMyCharacter = null;
    mockHouse = '';
    render(
      <MemoryRouter>
        <HomePage 
          house={mockHouse}
          setHouse={mockSetHouse}
          getStudentsByHouse={mockGetStudentsByHouse}
          myCharacter={mockMyCharacter}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Welcome, 1st Year!')).toBeInTheDocument();
    expect(screen.getByAltText('sorting hat')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'find my house'})).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {name: 'find my house'}));
    expect(mockSetHouse).toHaveBeenCalledTimes(1);
  })

  it('should show user which house is assigned', async () => {
    mockMyCharacter = null;
    mockHouse = 'Ravenclaw';

    render(
      <MemoryRouter>
        <HomePage 
          house={mockHouse}
          setHouse={mockSetHouse}
          getStudentsByHouse={mockGetStudentsByHouse}
          myCharacter={mockMyCharacter}
        />
      </MemoryRouter>
    )

    const result = await waitFor(() => screen.getByText('You are... Ravenclaw!'));
    expect(result).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'choose character'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'learn about Ravenclaw'})).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {name: 'choose character'}));
    expect(mockGetStudentsByHouse).toHaveBeenCalledTimes(1);
  })

  it('should change character button if a character has been finalized', async () => {
    mockMyCharacter = {
      _id: 'jng7',
      alias: 'Moaning Myrtle',
      bloodStatus: 'muggle-born',
      deathEater: false,
      dumbledoresArmy: false,
      house: 'Ravenclaw',
      ministryOfMagic: false,
      name: 'Myrtle Warren',
      orderOfThePhoenix: false,
      role: 'student',
      school: 'Hogwarts',
      species: 'ghost'
    };

    mockHouse = 'Ravenclaw';

    render(
      <MemoryRouter>
        <HomePage 
          house={mockHouse}
          setHouse={mockSetHouse}
          getStudentsByHouse={mockGetStudentsByHouse}
          myCharacter={mockMyCharacter}
        />
      </MemoryRouter>
    )

    const result = await waitFor(() => screen.getByText('You are... Ravenclaw!'));
    expect(result).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'view character details'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'learn about Ravenclaw'})).toBeInTheDocument();
  })
})