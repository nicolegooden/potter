import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterDetails from './CharacterDetails.js';
import { MemoryRouter } from 'react-router-dom';

describe('Character Details', () => {
    
  it('should render expected elements', () => {
    const mockDetails = {
      _id: 'def456',
      name: 'Draco Malfoy',
      role: 'student',
      house: 'Slytherin',
      school: 'Hogwarts',
      ministryOfMagic: false,
      orderOfThePhoenix: false, 
      dumbledoresArmy: false,
      boggart: 'Harry Potter',
      deathEater: true,
      bloodStatus: 'pure-blood',
      species: 'human'
    }
    const mockDetermineAssociation = jest.fn();

    render(
      <MemoryRouter>
        <CharacterDetails
          details={mockDetails}
          determineAssociation={mockDetermineAssociation}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Draco Malfoy')).toBeInTheDocument();
    expect(screen.getByText('House: Slytherin')).toBeInTheDocument();
    expect(screen.getByText('Blood Status: pure-blood')).toBeInTheDocument();
    expect(screen.getByText('Species: human')).toBeInTheDocument();
    expect(screen.getByText('Attending: Hogwarts')).toBeInTheDocument();
    expect(screen.getByText('Associations:')).toBeInTheDocument();
    expect(screen.getByText('Boggart: Harry Potter')).toBeInTheDocument();
    expect(mockDetermineAssociation).toHaveBeenCalledTimes(4);
  })
})