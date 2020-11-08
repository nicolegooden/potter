import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import HomePage from './Homepage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  
  let mockHouse;
  let mockSetHouse;
  let mockGetStudentsByHouse;
  let mockMyCharacter;

  beforeEach(() => {
    mockHouse = 'Ravenclaw';
    mockSetHouse = jest.fn();
    mockGetStudentsByHouse = jest.fn();
  })
  it('should render expected elements when user arrives', () => {

    mockMyCharacter = null;

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


  })
})