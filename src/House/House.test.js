import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import House from './House.js';
import { MemoryRouter } from 'react-router-dom';

describe('House', () => {
  it('should render all house details', () => {

    const mockHouseDetails = {
      _id: 'sdfkj952',
      color1: 'blue', 
      color2: 'bronze',
      founder: 'Rowena Ravenclaw',
      headOfHouse: 'Fillius Flitwick',
      houseGhost: 'The Grey Lady',
      mascot: 'eagle',
      members: ['gfdkglj889', 'qwir330', 'bmnk4237'],
      name: 'Ravenclaw',
      school: 'Hogwarts',
      value1: 'intelligence',
      value2: 'creativity',
      value3: 'wit',
      value4: 'learning'
    }

    render(
      <MemoryRouter>
        <House 
          details={mockHouseDetails}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Ravenclaw')).toBeInTheDocument();
    expect(screen.getByText('Fillius Flitwick')).toBeInTheDocument();
    expect(screen.getByText('Rowena Ravenclaw')).toBeInTheDocument();
    expect(screen.getByText('The Grey Lady')).toBeInTheDocument();
    expect(screen.getByText('eagle')).toBeInTheDocument();
    expect(screen.getByText('intelligence, creativity, wit, & learning')).toBeInTheDocument();
    expect(screen.getByText('blue & bronze')).toBeInTheDocument();
  })
})