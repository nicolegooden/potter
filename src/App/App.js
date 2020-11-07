import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import CharactersContainer from '../CharactersContainer/CharactersContainer';
import House from '../House/House';
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
      myCharacter: null
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
        <Route 
          path='/house/:houseName'
          render={({ match }) => {
            const house = this.state.allHouses.find(house => house.name === match.params.houseName)
            if (house) {
              console.log(house)
              return <House name={house.name}/>
            }
          }}
        >

        </Route>
      </main>
    )
  }
}

export default App;
