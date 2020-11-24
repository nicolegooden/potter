import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import CharactersContainer from '../CharactersContainer/CharactersContainer';
import House from '../House/House';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import SpellsContainer from '../SpellsContainer/SpellsContainer';
import { getSorted, getCharacters, getMyCharacter, getAllHouses } from '../apiCalls'

class App extends Component {
  constructor() {
    super();
    this.state = {
      house: '',
      allCharacters: [],
      allHouses: [],
      studentsByHouse: [],
      myName: '',
      myCharacter: null, 
      mySpells: [],
      spellToPractice: null,
      error: '',
      myID: null
    }
    this.baseState = this.state;
  }

  componentDidMount = () => {
    this.getAllCharacters();
    this.setAllHouses();
  }

  setHouse = () => {
    getSorted().then((houseName) => {
      houseName ? 
      this.setState({house: houseName}) : 
      this.setState({error: 'Sorting hat results are inconclusive.  Try again.'})
    })
  }

  setAllHouses = () => {
    getAllHouses()
    .then((houses) => {
      houses ? 
      this.setState({allHouses: houses}) : 
      this.setState({error: 'No houses available.'})
    })
  }

  getAllCharacters = () => {
    getCharacters()
    .then((characters) => {
      characters ? 
      this.setState({allCharacters: characters}) : 
      this.setState({error: 'Oops, no students to show!'});
    })
  }

  determineAssociation = (association) => {
    if (this.state.myCharacter[association]) {
      if (association === 'dumbledorsArmy') {
        return <h2 className='association'>Dumbledore's Army</h2>
      } 
      if (association === 'orderOfThePhoenix') {
        return <h2 className='association'>Order of the Phoenix</h2>
      } 
      if (association === 'deathEater') {
        return <h2 className='association'>Death Eater</h2>
      }
      if (association === 'ministryOfMagic') {
        return <h2 className='association'>Ministry of Magic</h2>
      }
    }
  }

  getStudentsByHouse = () => {
    const studentsByHouse = this.state.allCharacters.filter(char => {
      return char.house === this.state.house && char.role === 'student';
    })
    this.setState({studentsByHouse: studentsByHouse})
  }

  setCharacter = (characterID) => {
    getMyCharacter(characterID)
    .then((charDetails) => {
      charDetails ? 
      this.setState({myCharacter: charDetails[0]}) : 
      this.setState({error: 'Could not retrieve character details.'})
    })
  }

  setTempCharacterDetails = (characterName, characterID) => {
    this.setState({myName: characterName})
    this.setState({myID: characterID})
  }

  addSpell = (spell) => {
    this.setState({mySpells: [...this.state.mySpells, spell]})
  }

  logPoints = (result, spellToPractice) => {
    let match = this.state.mySpells.find(spell => {
      return spell === spellToPractice;
    })
    let matchIndex = this.state.mySpells.indexOf(match)
     let newArray = [...this.state.mySpells]
     newArray[matchIndex] = {...newArray[matchIndex], 
      points: match.points + (result + 1)}
     this.setState({mySpells: newArray, spellToPractice: null})
  }

  declarePracticeSpell = (spell) => {
    this.setState({spellToPractice: spell})
  }

  resetGame = () => {
    if (window.confirm('Saved data will be deleted. Continue?')) {
      this.setState(this.baseState);
      this.getAllCharacters();
      this.setAllHouses();
    } 
  }

  render() {
    return (
      <main className='app-container'>
        <h1 className='error'>{this.state.error}</h1>
        <Route path='/'>
          <Header 
            getStudentsByHouse={this.getStudentsByHouse} 
            resetGame={this.resetGame}
          />
        </Route>
        <Route exact path='/home'>
          <HomePage 
            house={this.state.house}
            setHouse={this.setHouse}
            getStudentsByHouse={this.getStudentsByHouse}
            myCharacter={this.state.myCharacter}
          />
        </Route>
        <Route path='/characters'>
          <CharactersContainer 
            allCharacters={this.state.allCharacters}
            house={this.state.house}
            studentsByHouse={this.state.studentsByHouse}
            setCharacter={this.setCharacter}
            setTempCharacterDetails={this.setTempCharacterDetails}
            myName={this.state.myName}
            myCharacter={this.state.myCharacter}
            myID={this.state.myID}
          />
        </Route>
        <Route path='/spells'>
          <SpellsContainer 
            myCharacter={this.state.myCharacter}
            mySpells={this.state.mySpells}
            addSpell={this.addSpell}
            logPoints={this.logPoints}
            spellToPractice={this.state.spellToPractice}
            declarePracticeSpell={this.declarePracticeSpell}
          />
        </Route>
        <Route 
          path='/house/:houseName'
          render={({ match }) => {
            const house = this.state.allHouses.find(house => house.name === match.params.houseName)
            if (house) {
              return <House details={house}/>
            }
          }}
        >
        </Route>
        <Route 
          path='/my-character/:characterName'
          render={({ match }) => {
            if (match.params.characterName === this.state.myCharacter.name) {
              return <CharacterDetails 
                details={this.state.myCharacter}
                determineAssociation={this.determineAssociation}
              />
            }
          }}
        >
        </Route>
      </main>
    )
  }
}

export default App;
