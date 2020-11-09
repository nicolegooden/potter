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
      allStudents: [],
      allHouses: [],
      studentsByHouse: [],
      myName: '',
      myCharacter: null, 
      mySpells: [],
      spellToPractice: null
    }
  }

  componentDidMount = () => {
    this.getAllStudents();
    this.setAllHouses();
  }

  setHouse = () => {
    getSorted().then((houseName) => this.setState({house: houseName}))
  }

  setAllHouses = () => {
    getAllHouses()
    .then((houses) => this.setState({allHouses: houses}))
  }

  getAllStudents = () => {
    getCharacters()
    .then((characters) => {
      const students = characters.filter(char => {
        return char.role === 'student'
      })
      this.setState({allStudents: students})
    });
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
    const studentsByHouse = this.state.allStudents.filter(student => {
      return student.house === this.state.house;
    })
    this.setState({studentsByHouse: studentsByHouse})
  }

  setCharacter = (characterID) => {
    getMyCharacter(characterID)
    .then((charDetails) => {
      this.setState({myCharacter: charDetails})
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

  render() {
    return (
      <main className='app-container'>
        <Route path='/'>
          <Header />
        </Route>
        <Route exact path='/'>
          <HomePage 
            house={this.state.house}
            setHouse={this.setHouse}
            getStudentsByHouse={this.getStudentsByHouse}
            myCharacter={this.state.myCharacter}
          />
        </Route>
        <Route path='/characters'>
          <CharactersContainer 
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

// console.log(matchIndex)
    // this.setState(prevState => {
    //  let mySpell = Object.assign({}, prevState.mySpells[matchIndex])
    // //  console.log('prevState', prevState.mySpells[matchIndex])
    // //  console.log('my spell', mySpell)
    // //  console.log('my spell points', mySpell.points)
    //  mySpell.points = mySpell.points += (result + 1) 
    //  console.log('my final spell', mySpell)
    //  return this.state.mySpells[mySpell] ;
  //  }) 
   // this.setState({currentPoints: result + 1})