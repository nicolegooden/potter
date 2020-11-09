import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SpellsContainer from './SpellsContainer.js';
import { MemoryRouter } from 'react-router-dom';
import { getSpells } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('SpellsContainer', () => {

  let mockDeclarePracticeSpell;
  let mockAddSpell;
  let mockLogPoints;

  beforeEach(() => {
    getSpells.mockResolvedValueOnce([
      {
        _id: 'a1',
        spell: 'Aberto',
        type: 'Charm',
        effect: 'opens objects'   
      },
      {
        _id: 'b2',
        spell: 'Anapneo',
        type: 'Spell',
        effect: 'clears the target\'s airway'   
      },
      {
        _id: 'c3',
        spell: 'Babbling Curse',
        type: 'Curse',
        effect: 'makes a person babble'   
      },
      {
        _id: 'd4',
        spell: 'Bombarda',
        type: 'Spell',
        effect: 'causes explosions'   
      },
      {
        _id: 'e5',
        spell: 'Bombarda Maxima',
        type: 'Spell',
        effect: 'causes large explosions'   
      },
      {
        _id: 'f6',
        spell: 'Depulso',
        type: 'Charm',
        effect: 'drives an object away'   
      },
      {
        _id: 'g7',
        spell: 'Duro',
        type: 'Spell',
        effect: 'makes objects hard'   
      },
      {
        _id: 'h8',
        spell: 'Expulso',
        type: 'Spell',
        effect: 'makes objects explode'   
      }
    ]);

    mockDeclarePracticeSpell = jest.fn();
    mockAddSpell = jest.fn();
    mockLogPoints = jest.fn();
  })

  it('should show expected content when user has not chosen a character', async () => {
    
    const mockMyCharacter = null;
    const mockMySpells = [];
    const mockSpellToPractice = null;
    
    render(
      <MemoryRouter>
        <SpellsContainer 
          myCharacter={mockMyCharacter}
          mySpells={mockMySpells}
          addSpell={mockAddSpell}
          logPoints={mockLogPoints}
          spellToPractice={mockSpellToPractice}
          declarePracticeSpell={mockDeclarePracticeSpell}
        />  
      </MemoryRouter>
    )
    const prompt = screen.getByText('Please get sorted and choose a character to start saving spells!');
    expect(prompt).toBeInTheDocument();
    const spell = await waitFor(() => screen.getByText('Aberto'))
    expect(spell).toBeInTheDocument();
    expect(screen.getByText('opens objects')).toBeInTheDocument();
    expect(screen.getByText('Depulso')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'add'})).toBeNull();
    expect(screen.getByRole('button', {name: 'search'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'search'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'view all'})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search by name, effect, or type')).toBeInTheDocument();
    expect(screen.getByText('Browse Spells')).toBeInTheDocument();
  })

  it('should allow user to search for spells and view all spells after', async () => {
    const mockMyCharacter = null;
    const mockMySpells = [];
    const mockSpellToPractice = null;
    
    render(
      <MemoryRouter>
        <SpellsContainer 
          myCharacter={mockMyCharacter}
          mySpells={mockMySpells}
          addSpell={mockAddSpell}
          logPoints={mockLogPoints}
          spellToPractice={mockSpellToPractice}
          declarePracticeSpell={mockDeclarePracticeSpell}
        />  
      </MemoryRouter>
    )

    const spell = await waitFor(() => screen.getByText('Aberto'))
    expect(spell).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'search'})).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText('search by name, effect, or type'), 'explo');
    userEvent.click(screen.getByRole('button', {name: 'search'}));

    expect(screen.getByText('Expulso')).toBeInTheDocument();
    expect(screen.getByText('Bombarda Maxima')).toBeInTheDocument();
    expect(screen.getByText('Bombarda')).toBeInTheDocument();
    expect(screen.queryByText('Aberto')).toBeNull();
    expect(screen.queryByText('Babbling Curse')).toBeNull();
    expect(screen.queryByText('Duro')).toBeNull();
    expect(screen.queryByText('Depulso')).toBeNull();
    expect(screen.queryByText('Anapneo')).toBeNull();

    userEvent.click(screen.getByRole('button', {name: 'view all'}))

    expect(screen.getByText('Expulso')).toBeInTheDocument();
    expect(screen.getByText('Bombarda Maxima')).toBeInTheDocument();
    expect(screen.getByText('Bombarda')).toBeInTheDocument();
    expect(screen.queryByText('Aberto')).toBeInTheDocument();
    expect(screen.queryByText('Babbling Curse')).toBeInTheDocument();
    expect(screen.queryByText('Duro')).toBeInTheDocument();
    expect(screen.queryByText('Depulso')).toBeInTheDocument();
    expect(screen.queryByText('Anapneo')).toBeInTheDocument();
  })

  it('should show user an error when no spells match the search', async () => {
    const mockMyCharacter = null;
    const mockMySpells = [];
    const mockSpellToPractice = null;
    
    render(
      <MemoryRouter>
        <SpellsContainer 
          myCharacter={mockMyCharacter}
          mySpells={mockMySpells}
          addSpell={mockAddSpell}
          logPoints={mockLogPoints}
          spellToPractice={mockSpellToPractice}
          declarePracticeSpell={mockDeclarePracticeSpell}
        />  
      </MemoryRouter>
    )

    const spell = await waitFor(() => screen.getByText('Aberto'))
    expect(spell).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText('search by name, effect, or type'), 'hermione');
    userEvent.click(screen.getByRole('button', {name: 'search'}));

    expect(screen.getByRole('button', {name: 'search'})).toBeDisabled();
    expect(screen.getByText('Sorry, no spells found. Try searching by name, effect, or type!')).toBeInTheDocument();

    expect(screen.queryByText('Expulso')).toBeNull();
    expect(screen.queryByText('Bombarda Maxima')).toBeNull();
    expect(screen.queryByText('Bombarda')).toBeNull();
    expect(screen.queryByText('Aberto')).toBeNull();
    expect(screen.queryByText('Babbling Curse')).toBeNull();
    expect(screen.queryByText('Duro')).toBeNull();
    expect(screen.queryByText('Depulso')).toBeNull();
    expect(screen.queryByText('Anapneo')).toBeNull();
  })
})