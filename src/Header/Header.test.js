import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('should show an HP logo and three nav links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByAltText('Harry Potter logo')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('characters')).toBeInTheDocument();
    expect(screen.getByText('spells')).toBeInTheDocument();
  })

  it('should allow user to click on nav links', () => {
    render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      )
    
    userEvent.click(screen.getByText('home'));
    userEvent.click(screen.getByText('characters'));
    userEvent.click(screen.getByText('spells'));
  })
})