import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SpellCard from './SpellCard.js';
import { MemoryRouter } from 'react-router-dom';

describe('Spell Card', () => {

  let mockAddSpell;
  let mockDeclarePracticeSpell;

  beforeEach(() => {
    mockAddSpell = jest.fn();
    mockDeclarePracticeSpell = jest.fn();
  })

  it('should render expected elements when no character exists', () => {
    const mockSpell = {
      _id: 'f6',
      spell: 'Depulso',
      type: 'Charm',
      effect: 'drives an object away'   
    };
    const mockMyCharacter = null;
    const mockMySpells = [];

    render(
        <MemoryRouter>
          <SpellCard 
            spell={mockSpell}
            myCharacter={mockMyCharacter}
            addSpell={mockAddSpell}
            mySpells={mockMySpells}
            declarePracticeSpell={mockDeclarePracticeSpell}
          />  
        </MemoryRouter>
    )
    expect(screen.getByText('Depulso')).toBeInTheDocument();
    expect(screen.getByText('Charm')).toBeInTheDocument();
    expect(screen.getByText('drives an object away')).toBeInTheDocument();
  })

  it('should render add button when character exists', () => {
    const mockSpell = {
        _id: 'f6',
        spell: 'Depulso',
        type: 'Charm',
        effect: 'drives an object away'   
      };
      const mockMyCharacter = {
        _id: 'dsflj45',
        name: 'Parvati Patil',
        bloodStatus: 'unknown',
        species: 'human',
        role: 'student',
        house: 'Gryffindor' 
      };
      const mockMySpells = [];
  
      render(
          <MemoryRouter>
            <SpellCard 
              spell={mockSpell}
              myCharacter={mockMyCharacter}
              addSpell={mockAddSpell}
              mySpells={mockMySpells}
              declarePracticeSpell={mockDeclarePracticeSpell}
            />  
          </MemoryRouter>
      )

      expect(screen.getByText('Depulso')).toBeInTheDocument();
      expect(screen.getByText('Charm')).toBeInTheDocument();
      expect(screen.getByText('drives an object away')).toBeInTheDocument();
      expect(screen.getByTestId('add button for f6')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('add button for f6'));
      expect(mockAddSpell).toHaveBeenCalledTimes(1);
      expect(mockAddSpell).toHaveBeenCalledWith(mockSpell);
  })
 
  it('should render practice button if included in mySpells', () => {
    const mockSpell = {
        _id: 'f6',
        spell: 'Depulso',
        type: 'Charm',
        effect: 'drives an object away'   
      };
      const mockMyCharacter = {
        _id: 'dsflj45',
        name: 'Parvati Patil',
        bloodStatus: 'unknown',
        species: 'human',
        role: 'student',
        house: 'Gryffindor' 
      };
      const mockMySpells = [
        {
            _id: 'f6',
            spell: 'Depulso',
            type: 'Charm',
            effect: 'drives an object away'   
        }
      ];
  
      render(
          <MemoryRouter>
            <SpellCard 
              spell={mockSpell}
              myCharacter={mockMyCharacter}
              addSpell={mockAddSpell}
              mySpells={mockMySpells}
              declarePracticeSpell={mockDeclarePracticeSpell}
            />  
          </MemoryRouter>
      )

      expect(screen.getByTestId('practice button for f6')).toBeInTheDocument();
      expect(screen.queryByTestId('add button for f6')).toBeNull();
      userEvent.click(screen.getByTestId('practice button for f6'));
      expect(mockDeclarePracticeSpell).toHaveBeenCalledTimes(1);
      expect(mockDeclarePracticeSpell).toHaveBeenCalledWith(mockSpell);
  })
})
