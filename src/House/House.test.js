import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import House from './House.js';
import { MemoryRouter } from 'react-router-dom';

describe('House', () => {
  it('should render all house details', () => {

    const mockHouseDetails = {
      _id: 'sdfkj952',
      colors: ['blue', 'bronze'],
      founder: 'Rowena Ravenclaw',
      headOfHouse: 'Fillius Flitwick',
      houseGhost: 'The Grey Lady',
      mascot: 'eagle',
      members: ['gfdkglj889', 'qwir330', 'bmnk4237'],
      name: 'Ravenclaw',
      school: 'Hogwarts',
      values: ['intelligence', 'creativity', 'wit']
    }

    render(
      <MemoryRouter>
        <House 
          details={mockHouseDetails}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Ravenclaw')).toBeInTheDocument();
    expect(screen.getByText('Head: Fillius Flitwick')).toBeInTheDocument();
    expect(screen.getByText('Founder: Rowena Ravenclaw')).toBeInTheDocument();
    expect(screen.getByText('Ghost: The Grey Lady')).toBeInTheDocument();
    expect(screen.getByText('Mascot: eagle')).toBeInTheDocument();
    expect(screen.getByText('Values: intelligence creativity wit')).toBeInTheDocument();
    expect(screen.getByText('Colors: blue bronze')).toBeInTheDocument();
  })
})