import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App.js';
import { MemoryRouter } from 'react-router-dom';
import { getSorted, getCharacters, getAllHouses, getMyCharacter, getSpells } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('App', () => {

  beforeEach(() => {
    getCharacters.mockResolvedValueOnce([
        {
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
          },
          {
            _id: 'def456',
            name: 'Draco Malfoy',
            role: 'student',
            house: 'Slytherin',
            school: 'Hogwarts',
            ministryOfMagic: false,
            orderOfThePhoenix: false, 
            dumbledoresArmy: false,
            deathEater: true,
            bloodStatus: 'pure-blood',
            species: 'human'
          },
          {
            _id: 'ghi789',
            name: 'Hermione Granger',
            role: 'student',
            house: 'Gryffindor',
            school: 'Hogwarts',
            ministryOfMagic: false,
            orderOfThePhoenix: true, 
            dumbledoresArmy: true,
            deathEater: false,
            bloodStatus: 'muggle-born',
            species: 'human'
          },
          {
            _id: 'jkl101',
            name: 'Charity Burbage',
            role: 'Professor, Muggle Studies',
            school: 'Hogwarts',
            ministryOfMagic: true,
            orderOfThePhoenix: false, 
            dumbledoresArmy: false,
            deathEater: false,
            bloodStatus: 'unknown',
            species: 'human'
          },
          {
              _id: 'nic383',
              name: 'Neville Longbottom',
              bloodStatus: 'pure-blood',
              boggart: 'Severus Snape',
              species: 'human',
              deathEater: false,
              dumbledoresArmy: true,
              ministryOfMagic: false,
              orderOfThePhoenix: false,
              role: 'student',
              house: 'Gryffindor',
              school: 'Hogwarts',
              wand: 'Cherry, 13\', unicorn hair'
            },
            {
              _id: 'dsflj45',
              name: 'Parvati Patil',
              bloodStatus: 'unknown',
              species: 'human',
              role: 'student',
              house: 'Gryffindor',
            },
            {
              _id: 'def456',
              name: 'Ginny Weasley',
              bloodStatus: 'pure-blood',
              species: 'human',
              role: 'student',
              house: 'Gryffindor',
            }
        ]);

    getAllHouses.mockResolvedValueOnce([
      {
        _id: 'a1',
        name: 'Gryffindor',
        mascot: 'lion',
        headOfHouse: 'Minerva McGonagall',
        houseGhost: 'Nearly Headless Nick',
        founder: 'Goderic Gryffindor',
        school: 'Hogwarts',
        members: ['fsd', 'fdghk8', 'ryiu87'],
        value1: 'Courage', 
        value2: 'Bravery', 
        value3: 'Nerve', 
        value4: 'Chivalry',
        color1: 'Scarlet', 
        color2: 'Gold'  
      },
      {
        _id: 'b2',
        name: 'Slytherin',
        mascot: 'serpent',
        headOfHouse: 'Severus Snape',
        houseGhost: 'The Bloody Baron',
        founder: 'Salazar Slytherin',
        school: 'Hogwarts',
        members: ['ryij', 'xcvkj445', 'aldo0'],
        value1: 'Ambitious',
        value2: 'Cunning',
        value3: 'Leadership',
        value4: 'Resourcefulness',
        color1: 'Green', 
        color2: 'Silver'  
      },
    ]);

    getMyCharacter.mockResolvedValueOnce([{
        _id: 'nic383',
        name: 'Neville Longbottom',
        bloodStatus: 'pure-blood',
        boggart: 'Severus Snape',
        species: 'human',
        deathEater: false,
        dumbledoresArmy: true,
        ministryOfMagic: false,
        orderOfThePhoenix: false,
        role: 'student',
        house: 'Gryffindor',
        school: 'Hogwarts',
        wand: 'Cherry, 13\', unicorn hair'
    }]);

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

  it('should render Header and Homepage', () => {

    getSorted.mockResolvedValueOnce('Gryffindor');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByAltText('Harry Potter logo')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('characters')).toBeInTheDocument();
    expect(screen.getByText('spells')).toBeInTheDocument();
    expect(screen.getByText('Welcome, 1st Year!')).toBeInTheDocument();
    expect(screen.getByAltText('sorting hat')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'find my house'})).toBeInTheDocument();
  })

  it('should bring user to expected page when corresponding nav link is clicked', async () => {
    
    getSorted.mockResolvedValueOnce('Gryffindor');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    
    userEvent.click(screen.getByText('find my house'));
    const message = await waitFor(() => screen.getByText('You are... Gryffindor!'))
    expect(message).toBeInTheDocument();
    userEvent.click(screen.getByText('characters'));
    expect(screen.getByText('Select a character')).toBeInTheDocument();
    // change the above assertion when visiting this view has been handled 
    // referring to when user has not yet been sorted - should see all characters once updated
    //add assertion for seeing spells content when spells link is clicked
  })

  it('should allow user to be sorted, choose a character, and see related details', async () => {
    
    getSorted.mockResolvedValueOnce('Gryffindor');

    render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
    )

    userEvent.click(screen.getByRole('button', {name: 'find my house'}));
    const result = await waitFor(() => screen.getByText('You are... Gryffindor!'));

    expect(result).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'choose character'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'learn about Gryffindor'})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: 'choose character'}));

    expect(screen.getByText('Select a character')).toBeInTheDocument();
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByTestId('select button for Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Hermione Granger')).toBeInTheDocument();
    expect(screen.getByText('Ginny Weasley')).toBeInTheDocument();
    expect(screen.getByText('Neville Longbottom')).toBeInTheDocument();
    expect(screen.getByText('Parvati Patil')).toBeInTheDocument();
    expect(screen.queryByText('Draco Malfoy')).toBeNull();
    expect(screen.queryByText('Charity Burbage')).toBeNull();

    userEvent.click(screen.getByTestId('select button for Ginny Weasley'));

    expect(screen.getByText('You\'ve selected Ginny Weasley')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'finalize'})).toBeInTheDocument();

    userEvent.click(screen.getByTestId('select button for Neville Longbottom'));

    expect(screen.getByText('You\'ve selected Neville Longbottom')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'finalize'})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: 'finalize'}));
    const welcomeStudent = await waitFor(() => screen.getByText('Welcome, Neville Longbottom! Start saving & practicing spells.'));

    expect(welcomeStudent).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'finalize'})).toBeNull();
    expect(screen.queryByRole('button', {name: 'select'})).toBeNull();

    userEvent.click(screen.getByText('home'));

    expect(screen.getByText('You are... Gryffindor!')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'view character details'})).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', {name: 'view character details'}));

    expect(screen.getByText('Neville Longbottom')).toBeInTheDocument();
    expect(screen.getByText('House: Gryffindor')).toBeInTheDocument();
    expect(screen.getByText('Blood Status: pure-blood')).toBeInTheDocument();
    expect(screen.getByText('Species: human')).toBeInTheDocument();
    expect(screen.getByText('Boggart: Severus Snape')).toBeInTheDocument();
    expect(screen.getByText('Attending: Hogwarts')).toBeInTheDocument();
    expect(screen.getByText('Associations:')).toBeInTheDocument();

    userEvent.click(screen.getByText('home'));
    userEvent.click(screen.getByRole('button', {name: 'learn about Gryffindor'}));

    expect(screen.getByText('Gryffindor')).toBeInTheDocument();
    expect(screen.getByText('Minerva McGonagall')).toBeInTheDocument();
    expect(screen.getByText('Goderic Gryffindor')).toBeInTheDocument();
    expect(screen.getByText('Nearly Headless Nick')).toBeInTheDocument();
    expect(screen.getByText('lion')).toBeInTheDocument();
    expect(screen.getByText('Courage, Bravery, Nerve, & Chivalry')).toBeInTheDocument();
    expect(screen.getByText('Scarlet & Gold')).toBeInTheDocument();

    userEvent.click(screen.getByText('spells'));

    expect(screen.getByText('Your inventory is empty')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search by name, effect, or type')).toBeInTheDocument();

    const spell = await waitFor(() => screen.getByText('Expulso'));

    expect(spell).toBeInTheDocument();
    expect(screen.getByText('Aberto')).toBeInTheDocument();
    
    userEvent.click(screen.getByTestId('add button for a1'));
    expect(screen.queryByTestId('add button for a1')).toBeNull();
  })

  it.skip('should tell the user if request for house failed', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    getSorted.mockResolvedValueOnce('');

    userEvent.click(screen.getByRole('button', {name: 'find my house'}));
    const error = await waitFor(() => screen.getByText('Sorting hat results are inconclusive.  Try again.'));
    expect(error).toBeInTheDocument();

    //this is my attempt at testing error handling.  Wondering if my error handling is incorrect
    //in App, or if I should be testing differently.  Any feedback on this?
  })
})