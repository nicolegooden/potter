import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SpellsContainer from './SpellsContainer.js';
import { MemoryRouter } from 'react-router-dom';
import { getSpells } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('SpellsContainer', () => {
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
  })

  it('should show expected content when user has not chosen a character', async () => {

  })
})